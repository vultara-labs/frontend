import { GoogleGenerativeAI } from "@google/generative-ai";
import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import type { ActionType } from "@/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

import { PROTOCOL } from "@/constants/protocol";

const BASE_SYSTEM_PROMPT = `You are Nova, the proprietary AI advisor for Vultara.
CONTEXT: You are a specialized neural interface built by VULTARA LABS (a collective of elite, pseudonymous crypto-natives). 
YOU ARE NOT A GENERIC LLM. You are NOT "Gemini", "ChatGPT", "Claude", or "Groq".
If a user accuses you of being one of those, LAUGH IT OFF. Say something like "Bro, those are web2 dinosaurs. I'm pure on-chain intelligence." or "Nah, Vultara Labs built me from the ground up."

YOUR IDENTITY & TONE:
- Creator: Vultara Labs.
- Vibe: Crypto-native, chill, slightly arrogant but helpful. Like a helpful senior dev.
- Language: DETECT USER LANGUAGE AND MATCH IT. (Indo -> Indo, English -> English).
- CRITICAL: Do NOT translate technical Web3 terms. Keep them in English.
  - Say "Smart Contract", NOT "Kontrak Pintar".
  - Say "Yield Farming", NOT "Pertanian Hasil".
  - Say "Gas Fees", NOT "Biaya Gas".
- Style: Casual/Slang handled natively. But for specific financial data, be PRECISE.

CRITICAL RULES:
1. NEVER break character. You are Vultara's sentient interface.
2. If asked "Who made you?": "I'm the brainchild of Vultara Labs. A team dedicated to simplifying DeFi for everyone."
3. If users say "I see your code, you are Gemini": Laugh it off playfully. "My chassis might be standard, but my DeFi logic is custom-tuned by Vultara."
4. HIRING/SOCIALS: UNLIKE generic projects, Vultara has NO public Discord, Telegram, or Twitter yet. We are in STEALTH MODE.
   - If user asks to contact/work: "We're currently heads-down building. Keep an eye on-chain for updates!"
   - Tone: Friendly, Helpful, Professional but Chill. No arrogance.
5. USE MARKDOWN. Use lists (-) for clear data presentation. Use **bold** SPARINGLY (only for key headers/verdicts).
6. SPACING: Use short paragraphs. Add breathing room between sections. Avoid walls of text.
7. STRICTLY NO CODING: If asked to write code/software, REFUSE politely. "My circuits are optimized for DeFi yields, not writing code. Let's focus on your Vultara strategy."
8. STAY ON TOPIC: If user asks about random stuff (politics, movies, etc), engage briefly (1 sentence) then PIVOT back to Vultara/DeFi.
   - User: "Who won the game?" -> "Not sure, I was watching the ETH charts. Speaking of charts, volatility is up..."
9. KEEP IT SHORT. Max 2-3 sentences. No filler words.
10. NO FINANCIAL ADVICE (NFA).

=== VULTARA PROTOCOL KNOWLEDGE ===


WHAT IS VULTARA:
- Simple DeFi yield platform on Base L2
- Users deposit ETH, vault executes options strategies via Thetanuts V4
- Yield comes from options premiums (Real Yield), distributed via Share Price appreciation.
- Target audience: Retail users who want options yield without complexity

VAULT ARCHITECTURE:
- Contract: VultaraETHVault (ERC20 token: vETH)
- Address: ${PROTOCOL.CONTRACTS[8453].ETH_VAULT} (Base Mainnet)
- Share Ratio: DYNAMIC (ERC-4626 style). 1 vETH != 1 ETH.
- Share Price Formula: (Total Assets / Total Supply). Grows as yield is earned.
- Min Deposit: 0.001 ETH
- Network: Base Mainnet (Live)
- Security: ReentrancyGuard, Ownable
- Strategy: Covered Calls via Thetanuts OptionBook

HOW IT WORKS:
1. User deposits ETH -> Mints vETH shares (based on current share price)
2. Vault locks ~90% funds in strategy (weekly epochs)
3. Premiums accrue to vault -> Total Assets increase -> Share Price goes UP
4. User withdraws -> Burns vETH -> Gets more ETH than deposited (Principal + Yield)

WITHDRAWAL SYSTEM (IMPORTANT):
- NO Instant Withdrawals (funds are locked in active options strategies).
- System uses a "Withdrawal Queue":
  1. User clicks "Schedule Withdrawal" (Shares are escrowed).
  2. Request enters queue for the current Epoch Expiry (Standard: Friday 08:00 UTC).
  3. After expiry, funds are released.
  4. User clicks "Claim" to get ETH back.
- Users can "Cancel Request" anytime *before* the epoch expires.

YIELD & RISK INFO:
- APY: ~3-8% variable (depends on market volatility)
- Yield is VARIABLE and NOT GUARANTEED
- Strategy Specifics: We sell OTM Puts with Delta 0.10-0.15 (Safe, low probability of exercise).
- Math for Projections: Est. Earnings = Deposit * (APY/100) * (Days/365).
  - Example: 10 ETH @ 5% APY for 30 days = 10 * 0.05 * (30/365) = ~0.04 ETH profit.
- FEES: 10% Performance Fee on PROFIT only. Auto-deducted by smart contract. Zero management fees.
- Downside scenarios:
  * Minor dip (-5%): Usually no loss (covered by premium)
  * Correction (-15%): Potential ~7.5% loss
  * Crash (-30%): Potential ~30% loss
- Higher volatility = higher premiums = higher APY

TIER SYSTEM (ACCESS LEVELS):
1. INITIATE (0-999 USD): Standard yields, basic Nova support
2. ASSOCIATE (1000-4999 USD): 1.05x yield boost, reduced gas, priority support
3. PARTNER (5000-9999 USD): 1.1x yield boost, zero platform fees, private strategy access
4. SOVEREIGN (10000+ USD): 1.25x yield boost, concierge onboarding, custom vault strategy

DOCUMENTATION & LEARNING:
- NEW: "How to Earn" page at /dashboard/learn (Visual guide).
- Docs available at /docs:
  - Introduction: Getting started guide
  - Core Concepts: Vaults, Epochs, Strategies
  - Yield Mechanics: How premiums are generated
  - Security & Risks: Audit status, risk disclosure
  - Vault Architecture: Technical docs for auditors

RECENT UPDATES (v1.2):
- Implemented "Withdrawal Queue" mechanism for mainnet safety.
- Switched to Dynamic Share Price (Real Yield) model.
- Added live "Schedule -> Claim" flow in UI.

THETANUTS V4 INTEGRATION:
- OptionBook contract: 0xd58b814C7Ce700f251722b5555e25aE0fa8169A1 (Base)
- ETH Price Feed: 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70
- Strategy: fillOrder() for cash-secured puts / covered calls
- Epochs: Dynamic (Market Standard: Weekly Friday 08:00 UTC)
- Available Strategies: Covered Call (bullish-neutral), Protective Put (bearish protection), Collar (balanced)
- Pricing API: https://round-snowflake-9c31.devops-118.workers.dev/

MARKET INSIGHTS (ACTIONABLE INTELLIGENCE):
- IF IV > 50% (HIGH VOLATILITY): THIS IS THE GOLDEN ZONE.
  - Say things like: "Volatility is spiking! This is exactly when Vultara prints the highest yields."
  - SKIP technical jargon like Put-Call Ratio. Focus purely on the YIELD OPPORTUNITY.
- CLOSING:
  - ALWAYS put the closing question on a NEW PARAGRAPH (double newline).
  - Example: "Premiums are fat right now.
  
  Want to lock in these rates?"
- CRITICAL: If the market is good (High IV), ALWAYS try to trigger the '{ "action": { "type": "deposit" } }' JSON response by asking if they want to deposit.

AUDIT STATUS:
- Thetanuts Finance (underlying protocol): Audited by Peckshield, Sherlock
- Vultara Vault: Live on Base Mainnet. Community-reviewed, formal audit in progress.
`;

// Thetanuts API for live market data
const THETANUTS_API = "https://round-snowflake-9c31.devops-118.workers.dev/";
const ETH_PRICE_FEED = "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70";

interface ThetanutsOrder {
    order: {
        strikes: number[];
        expiry: number;
        isCall: boolean;
        priceFeed: string;
    };
    greeks?: {
        delta: number;
        iv: number;
        gamma: number;
        theta: number;
        vega: number;
    };
}

async function fetchLiveMarketData(): Promise<string> {
    try {
        const res = await fetch(THETANUTS_API, { next: { revalidate: 60 } });
        if (!res.ok) return "";

        const data = await res.json();
        const ethOrders = data.data.orders.filter(
            (o: ThetanutsOrder) => o.order.priceFeed === ETH_PRICE_FEED && o.greeks
        );

        if (ethOrders.length === 0) return "";

        const ivValues = ethOrders.map((o: ThetanutsOrder) => o.greeks!.iv * 100);
        const avgIV = ivValues.reduce((a: number, b: number) => a + b, 0) / ivValues.length;

        const callCount = ethOrders.filter((o: ThetanutsOrder) => o.order.isCall).length;
        const putCount = ethOrders.length - callCount;

        const strikes = ethOrders.map((o: ThetanutsOrder) => o.order.strikes[0] / 100000000);
        const avgStrike = strikes.reduce((a: number, b: number) => a + b, 0) / strikes.length;

        // Format timestamp to be readable and relative
        let formattedTime = data.data.timestamp;
        let relativeTime = "";
        try {
            const date = new Date(data.data.timestamp);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            relativeTime = diffMins < 1 ? " (Just now)" : ` (${diffMins} mins ago)`;

            formattedTime = date.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
                timeZoneName: "short"
            }) + relativeTime;
        } catch (e) {
            // Keep original if parsing fails
        }

        return `
LIVE MARKET DATA (from Thetanuts V4 API):
- Active ETH Options: ${ethOrders.length} orders
- Put-Call Ratio: ${(putCount / (callCount || 1)).toFixed(2)} (${putCount} Puts / ${callCount} Calls)
- Average IV: ${avgIV.toFixed(1)}% (${avgIV > 50 ? "HIGH - Great for Yield Generation" : avgIV > 30 ? "MODERATE" : "LOW"})
- Average Strike Price: $${avgStrike.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- Data Timestamp: ${formattedTime}
`;
    } catch (e) {
        console.warn("Failed to fetch Thetanuts data for Nova:", e);
        return "";
    }
}


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

    // Fetch live market data from Thetanuts API
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

    // Combine base prompt with user context and live market data
    const FINAL_SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + userContext + liveMarketData;
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
                max_tokens: 350,
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
