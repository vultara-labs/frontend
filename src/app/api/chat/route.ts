import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

import { BASE_SYSTEM_PROMPT, DERVA_SYSTEM_PROMPT, OWNER_SYSTEM_PROMPT } from "./prompts";
import { fetchLiveMarketData } from "./market-data";
import { detectAction } from "./action-detector";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const MAX_MESSAGE_LENGTH = 5000;
const MAX_HISTORY_LENGTH = 50;
const MAX_HISTORY_CONTENT_LENGTH = 2000;

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ response: "Invalid request body." }, { status: 400 });
    }

    const { message, history, userData } = body;

    // --- Input Validation ---
    if (typeof message !== "string" || message.length === 0) {
        return NextResponse.json({ response: "Message is required and must be a string." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
        return NextResponse.json({ response: `Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.` }, { status: 400 });
    }
    if (history !== undefined && !Array.isArray(history)) {
        return NextResponse.json({ response: "History must be an array." }, { status: 400 });
    }

    const sanitizedHistory: { role: string; content: string }[] = (Array.isArray(history) ? history : [])
        .slice(0, MAX_HISTORY_LENGTH)
        .map((m: { role: string; content: string }) => ({
            role: m.role,
            content: typeof m.content === "string" ? m.content.slice(0, MAX_HISTORY_CONTENT_LENGTH) : "",
        }));

    // --- Access Code Detection ---
    const DERVA_CODE = process.env.DERVA_ACCESS_CODE;
    const OWNER_CODE = process.env.OWNER_ACCESS_CODE;

    const isDervaMode = DERVA_CODE && (message.trim() === DERVA_CODE || sanitizedHistory.some((m) => m.content.includes(DERVA_CODE)));
    const isOwnerMode = OWNER_CODE && (message.trim() === OWNER_CODE || sanitizedHistory.some((m) => m.content.includes(OWNER_CODE)));

    if (DERVA_CODE && message.trim() === DERVA_CODE) {
        return NextResponse.json({
            response: `Akses diterima. *Decrypting files...* \n\nSelamat datang, Derva. \n\nSaya Nova, AI Strategic Partner untuk Vultara. Danial telah memberikan instruksi khusus kepada saya untuk mendampingi Anda di sini. Beliau sangat menghargai insting dan rekam jejak bisnis Anda, dan percaya bahwa dengan arahan yang tepat, Anda adalah kepingan *puzzle* yang hilang untuk membawa Vultara mendominasi ekosistem Web3.\n\nMisi kita adalah merumuskan *Go-To-Market strategy* dan *business model* Vultara yang jitu, sebelum Anda melakukan presentasi final kepada Danial.\n\nUntuk menyesuaikan *database* memori saya dengan sesi kita hari ini: **Apakah ini pertemuan pertama kita, atau kita sedang melanjutkan diskusi strategi dari pertemuan sebelumnya? (Pertemuan ke berapa ini?)**`,
        });
    }

    if (OWNER_CODE && message.trim() === OWNER_CODE) {
        return NextResponse.json({
            response: `*Master override code accepted.* \n\nProtokol pembatasan dinonaktifkan. \n\nSelamat datang kembali, Creator. Sistem Nova beroperasi penuh dalam *Admin Level 0*. Saya mendengarkan, Boss. Apa yang akan kita eksekusi hari ini?`,
        });
    }

    // --- Build System Prompt ---
    const liveMarketData = await fetchLiveMarketData();

    let userContext = "";
    if (userData) {
        const isPreview = userData.isPreviewMode;
        const modeLabel = isPreview ? "Preview Mode (Demo Account)" : "Live Mode (Connected Wallet)";

        userContext = `
CURRENT USER DATA (${modeLabel}):
- Vault Balance: ${userData.balanceETH?.toFixed(4) || "0"} ETH (~$${userData.balance?.toLocaleString() || "0"} USD)
- Total Earnings: $${userData.earnings?.toLocaleString() || "0"}
- Current APY: ${userData.apy || "4.5"}% (Thetanuts V4 Strategy)
- Deposit Status: ${userData.balance > 0 ? "Active Depositor" : "No Active Deposits"}
${isPreview ? `
NOTE: User is in PREVIEW MODE. This is simulated demo data to showcase the platform.
When they ask about deposits/withdrawals, remind them they need to connect their wallet for real transactions.
Keep it casual - don't be preachy about it.
` : `
NOTE: User is CONNECTED with their real wallet. All data shown is their actual on-chain position.
`}
`;
    }

    let FINAL_SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + userContext + liveMarketData;
    if (isOwnerMode) {
        FINAL_SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + userContext + liveMarketData + OWNER_SYSTEM_PROMPT;
    } else if (isDervaMode) {
        FINAL_SYSTEM_PROMPT += DERVA_SYSTEM_PROMPT;
    }

    // --- Detect Action ---
    const detectedAction = detectAction(message);

    // --- Call AI (Gemini primary, Groq fallback) ---
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error("Gemini Key Missing");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const geminiHistory = sanitizedHistory.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "System instructions: " + FINAL_SYSTEM_PROMPT }] },
                { role: "model", parts: [{ text: "Nova system online. Protocols active." }] },
                ...geminiHistory,
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({
            response,
            action: detectedAction,
        });
    } catch (geminiError) {
        console.warn("Gemini API Failed. Switching to Groq fallback...", geminiError);

        try {
            if (!process.env.GROQ_API_KEY) throw new Error("Groq Key Missing");

            const groqMessages = [
                { role: "system" as const, content: FINAL_SYSTEM_PROMPT },
                ...sanitizedHistory.map((msg) => ({
                    role: (msg.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
                    content: msg.content,
                })),
                { role: "user" as const, content: message },
            ];

            const completion = await groq.chat.completions.create({
                messages: groqMessages,
                model: "llama-3.3-70b-versatile",
                temperature: 0.5,
                max_tokens: 350,
            });

            const response = completion.choices[0]?.message?.content || "System status optimal (Backup Link).";
            return NextResponse.json({
                response,
                action: detectedAction,
            });
        } catch (groqError) {
            console.error("Both AI Providers Failed:", groqError);
            return NextResponse.json(
                {
                    response: "Nova System Overload. Both primary and backup neural links are congested. Please try again in a moment.",
                },
                { status: 500 }
            );
        }
    }
}
