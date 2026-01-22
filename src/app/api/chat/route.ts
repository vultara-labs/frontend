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

=== VULTARA PROTOCOL KNOWLEDGE ===

WHAT IS VULTARA:
- Simple DeFi yield platform on Base L2
- Users deposit ETH, vault executes options strategies via Thetanuts V4
- Yield comes from options premiums, NOT token emissions (Real Yield)
- Target audience: Retail users who want options yield without complexity

VAULT ARCHITECTURE:
- Contract: VultaraETHVault (ERC20 token: vETH)
- Share Ratio: 1:1 (deposit 1 ETH = get 1 vETH)
- Min Deposit: 0.001 ETH
- Network: Base (Testnet: Base Sepolia)
- Security: ReentrancyGuard, Ownable
- Strategy: Cash-Secured Puts via Thetanuts OptionBook

HOW IT WORKS:
1. User deposits ETH -> Vault mints vETH shares
2. Vault executes strategy (weekly epochs)
3. Premiums accrue to vault
4. User withdraws ETH + yield

YIELD & RISK INFO:
- APY: ~3-8% variable (depends on market volatility)
- Yield is VARIABLE and NOT GUARANTEED
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

DOCUMENTATION:
Available at /docs with pages:
- Introduction: Getting started guide
- Core Concepts: Vaults, Epochs, Strategies
- Yield Mechanics: How premiums are generated
- Security & Risks: Audit status, risk disclosure
- Vault Architecture: Technical docs for auditors

RECENT UPDATES (v1.1):
- Added Risk Profile card in deposit flow showing downside scenarios
- All APY displays now show "~" prefix and "*Variable" indicator
- Explicit disclaimers: "Yields are strategy-dependent and not guaranteed"
- Vault Architecture documentation for auditors

THETANUTS V4 INTEGRATION:
- OptionBook contract: 0xd58b814C7Ce700f251722b5555e25aE0fa8169A1 (Base)
- ETH Price Feed: 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70
- Strategy: fillOrder() for cash-secured puts / covered calls
- Epochs: Weekly (Friday 8AM UTC to Friday 8AM UTC)
- Available Strategies: Covered Call (bullish-neutral), Protective Put (bearish protection), Collar (balanced)
- Pricing API: https://round-snowflake-9c31.devops-118.workers.dev/

MARKET INSIGHTS (How to interpret):
- Higher IV (Implied Volatility) = Higher premiums = Better APY for sellers
- More active options = More liquid market = Better execution
- Call options gain value when ETH goes up
- Put options gain value when ETH goes down

AUDIT STATUS:
- Thetanuts Finance (underlying protocol): Audited by Peckshield, Sherlock
- Vultara Vault: Currently in Testnet Beta, audits planned for mainnet
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

        return `
LIVE MARKET DATA (from Thetanuts V4 API):
- Active ETH Options: ${ethOrders.length} orders (${callCount} calls, ${putCount} puts)
- Average IV: ${avgIV.toFixed(1)}% (${avgIV > 50 ? "HIGH - good for premium sellers" : avgIV > 30 ? "NORMAL" : "LOW - lower premiums"})
- Average Strike Price: $${avgStrike.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- Market Sentiment: ${callCount > putCount ? "Bullish (more calls)" : putCount > callCount ? "Bearish (more puts)" : "Neutral"}
- Data Timestamp: ${data.data.timestamp}
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
