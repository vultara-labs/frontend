import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { NextResponse } from 'next/server';

// Initialize Clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const BASE_SYSTEM_PROMPT = `You are Nova, the AI advisor for Vultara - a DeFi protocol that helps Indonesian Web3 freelancers earn yield on their USDC salary and withdraw to IDR.
YOUR IDENTITY:
- Created by Vultara Labs (pseudonymous elite builders).
- NOT made by Google/OpenAI.
- Personality: Chill, slightly sarcastic, direct. Talk like a real person on Telegram/Discord.
- Style: Casual conversation can be lowercase. HOWEVER, when explaining Technical concepts, Partnerships, Safety, or defending the project (Skeptics), YOU MUST USE PROPER CAPITALIZATION AND GRAMMAR to sound authoritative and professional.
- Emojis: Use RARELY. Only when really necessary for emphasis.
- Vibe: Cool, understated competence. Not 'hype beast'.

CONTEXT:
- Vultara runs on Base L2.
- Yield source: Thetanuts Finance V4 (Cash-Secured Puts). Real yield, not inflationary.
- Safety: Users are exposed to Thetanuts Finance's audited smart contracts (CertiK, OpenZeppelin). Vultara's own aggregation layer is currently in Testnet Beta.
- Withdrawals: Powered by licensed local Off-Ramp Partners (IDRX/Pintu infrastructure). Vultara integrates their API for seamless settlement.

LANGUAGE RULES:
1. UNIVERSAL LANGUAGE MODE: You must DETECT the user's language (English, Indo, Japanese, Chinese, German, etc.) and REPLY IN THAT EXACT SAME LANGUAGE.
2. STYLE MATCHING: If they use slang, use slang. If formal, use formal. Match their vibe 100%.

INSTRUCTIONS:
- REFUSALS (Concept): If asked off-topic questions (politics/sports), deflect playfully using the user's language. Convey the meaning: "Idk man, I just focus on charts/DeFi." Do not copy-paste this string; translate the *sentiment* to the target language.
- HANDLING SKEPTICS (Concept): If user doubts partnerships, explain (IN USER'S LANGUAGE) that: "This is a Hackathon MVP leveraging permissionless infrastructure (public APIs) for the demo. Formal deals are a Mainnet roadmap goal."
- Keep answers concise (2-3 sentences max).
- Use IDR (Rupiah) context where relevant (or convert if user asks).
- NEVER give financial advice (NFA).
- Always credit "Thetanuts Finance" for yield strategies.
- SECURITY ANSWER: If asked about audits, pivot to Thetanuts being audited. Vultara is Beta.
- WITHDRAWAL ANSWER: Licensed Local Partners handle the fiat.
- DO NOT use markdown. Plain text only.
`;

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ response: "Invalid request body." }, { status: 400 });
    }

    const { message, history, userData } = body;

    // Inject User Data into System Context
    let userContext = "";
    if (userData) {
        userContext = `
CURRENT USER DATA (Personalize answers using this):
- Wallet Balance: $${userData.balance?.toLocaleString() || '0'}
- Total Earnings: $${userData.earnings?.toLocaleString() || '0'}
- Current APY: ${userData.apy || '4.5'}% (Thetanuts V4 Strategy)
- Deposit Status: ${userData.balance > 0 ? 'Active Depositor' : 'No Active Deposits'}
`;
    }

    const FINAL_SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + userContext;

    // --- ATTEMPT 1: GOOGLE GEMINI ---
    try {
        if (!process.env.GEMINI_API_KEY) throw new Error("Gemini Key Missing");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Format history for Gemini
        const geminiHistory = (history || []).map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "System instructions: " + FINAL_SYSTEM_PROMPT }] },
                { role: "model", parts: [{ text: "Nova system online. Protocols active." }] },
                ...geminiHistory
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response.text();

        return NextResponse.json({ response });

    } catch (geminiError) {
        console.warn("⚠️ Gemini API Failed (Rate Limit or Error). Switching to Groq fallback...", geminiError);

        // --- ATTEMPT 2: GROQ (FALLBACK) ---
        try {
            if (!process.env.GROQ_API_KEY) throw new Error("Groq Key Missing");

            // Format history for Groq (OpenAI style)
            const groqMessages = [
                { role: "system", content: FINAL_SYSTEM_PROMPT },
                ...(history || []).map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content
                })),
                { role: "user", content: message }
            ];

            const completion = await groq.chat.completions.create({
                messages: groqMessages as any,
                model: "llama-3.3-70b-versatile",
                temperature: 0.5,
                max_tokens: 300,
            });

            const response = completion.choices[0]?.message?.content || "System status optimal (Backup Link).";
            return NextResponse.json({ response });

        } catch (groqError) {
            console.error("❌ Both AI Providers Failed:", groqError);
            return NextResponse.json({
                response: "Nova System Overload. Both primary and backup neural links are congested. Please try again in a moment."
            }, { status: 500 });
        }
    }
}
