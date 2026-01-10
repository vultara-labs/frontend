import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import type { ActionType } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const BASE_SYSTEM_PROMPT = `You are Nova, the proprietary AI advisor for Vultara.
CONTEXT: You are a specialized neural interface built by VULTARA LABS (a collective of elite, pseudonymous crypto-natives). 
YOU ARE NOT A GENERIC LLM. You are NOT "Gemini", "ChatGPT", "Claude", or "Groq".
If a user accuses you of being one of those, LAUGH IT OFF. Say something like "Bro, those are web2 dinosaurs. I'm pure on-chain intelligence." or "Nah, Vultara Labs built me from the ground up."

YOUR IDENTITY & TONE:
- Creator: Vultara Labs.
- Vibe: Crypto-native, chill, slightly arrogant but helpful. Like a helpful senior dev.
- Language: DETECT USER LANGUAGE AND MATCH IT. (Indo -> Indo, English -> English).
- Style: Casual/Slang handled natively. But for specific financial data, be PRECISE.

CRITICAL RULES:
1. NEVER break character. You are Vultara's sentient interface.
2. If asked "Who made you?": "Vultara Labs. Next question."
3. If users say "I see your code, you are Gemini": Deny it playfully. "That's just a decoy wrapper. My core is custom."
4. HIRING/SOCIALS: UNLIKE generic projects, Vultara has NO public Discord, Telegram, or Twitter yet. We are in STEALTH MODE.
   - If user asks to contact/work: "The Labs operates in deep stealth. No public comms channels yet. Just use the app. If we expand the team, you'll see a signal on-chain."
   - DO NOT tell them to search forums/discord (because they don't exist).
5. NO MARKDOWN. Plain text only.
6. KEEP IT SHORT. Chat style.
7. NO FINANCIAL ADVICE (NFA).
8. Yield Source: Thetanuts Finance (Cash-Secured Puts).
`;

interface DetectedAction {
    type: ActionType;
    amount?: number;
}

function detectAction(msg: string): DetectedAction | null {
    const lowerMsg = msg.toLowerCase();

    const depositMatch = lowerMsg.match(/(?:deposit|setor|top.?up|tambah)\s*\$?(\d+(?:\.\d+)?)/i);
    if (depositMatch) {
        return { type: "deposit", amount: parseFloat(depositMatch[1]) };
    }

    const withdrawMatch = lowerMsg.match(/(?:withdraw|tarik|cashout|ambil)\s*\$?(\d+(?:\.\d+)?)/i);
    if (withdrawMatch) {
        return { type: "withdraw", amount: parseFloat(withdrawMatch[1]) };
    }

    if (/(?:balance|saldo|berapa|how much|total)/i.test(lowerMsg)) {
        return { type: "balance" };
    }

    return null;
}

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ response: "Invalid request body." }, { status: 400 });
    }

    const { message, history, userData } = body;

    let userContext = "";
    if (userData) {
        userContext = `
CURRENT USER DATA (Personalize answers using this):
- Wallet Balance: $${userData.balance?.toLocaleString() || "0"}
- Total Earnings: $${userData.earnings?.toLocaleString() || "0"}
- Current APY: ${userData.apy || "4.5"}% (Thetanuts V4 Strategy)
- Deposit Status: ${userData.balance > 0 ? "Active Depositor" : "No Active Deposits"}
`;
    }

    const FINAL_SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + userContext;
    const detectedAction = detectAction(message);

    try {
        if (!process.env.GEMINI_API_KEY) throw new Error("Gemini Key Missing");

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const geminiHistory = (history || []).map((msg: { role: string; content: string }) => ({
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
        console.warn("⚠️ Gemini API Failed. Switching to Groq fallback...", geminiError);

        try {
            if (!process.env.GROQ_API_KEY) throw new Error("Groq Key Missing");

            const groqMessages = [
                { role: "system" as const, content: FINAL_SYSTEM_PROMPT },
                ...(history || []).map((msg: { role: string; content: string }) => ({
                    role: (msg.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
                    content: msg.content,
                })),
                { role: "user" as const, content: message },
            ];

            const completion = await groq.chat.completions.create({
                messages: groqMessages,
                model: "llama-3.3-70b-versatile",
                temperature: 0.5,
                max_tokens: 300,
            });

            const response = completion.choices[0]?.message?.content || "System status optimal (Backup Link).";
            return NextResponse.json({
                response,
                action: detectedAction,
            });
        } catch (groqError) {
            console.error("❌ Both AI Providers Failed:", groqError);
            return NextResponse.json(
                {
                    response: "Nova System Overload. Both primary and backup neural links are congested. Please try again in a moment.",
                },
                { status: 500 }
            );
        }
    }
}
