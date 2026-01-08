"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
    Send,
    Bot,
    User,
    Sparkles,
    Shield,
    TrendingUp,
    ArrowUpRight
} from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
    time: string;
    card?: {
        title: string;
        score: string;
        items: { label: string; value: string; percent: number; color: string }[];
    };
};

const quickPrompts = [
    "Explain Yield Farming",
    "Analyze Vault Risk",
    "How to Withdraw?",
];

const initialMessages: Message[] = [
    {
        role: "assistant",
        content: "Hello! I analyze DeFi protocols to help you optimize your crypto salary. Paste a contract address or ask me about a strategy.",
        time: "Now"
    }
];

export default function AIAdvisorPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const handleSend = async (messageText?: string) => {
        const text = messageText || input;
        if (!text.trim()) return;

        setMessages(prev => [...prev, { role: "user", content: text, time: getCurrentTime() }]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            let response: Message = {
                role: "assistant",
                content: "",
                time: getCurrentTime()
            };

            if (text.toLowerCase().includes("risk") || text.toLowerCase().includes("vault") || text.toLowerCase().includes("safe")) {
                response.content = "Let's look at the breakdown. The Vultara Pool is currently audited by CertiK. The smart contract has a time-lock feature preventing immediate liquidity draining.\n\nRegarding your concern, since this is a stablecoin-only pool, impermanent loss is negligible.";
                response.card = {
                    title: "Safety Score",
                    score: "8.5 / 10",
                    items: [
                        { label: "Audit Status", value: "Pass (CertiK)", percent: 100, color: "#CCFF00" },
                        { label: "Volatility", value: "Low", percent: 15, color: "#10B981" },
                    ]
                };
            } else if (text.toLowerCase().includes("yield") || text.toLowerCase().includes("farm")) {
                response.content = "Yield farming di Vultara bekerja melalui strategi Cash-Secured Put di Thetanuts Finance V3.\n\nUSDC Anda digunakan sebagai collateral untuk menjual options, dan premium yang diterima menjadi yield Anda. APY saat ini 4.5% - ini organic yield dari market activity.";
            } else if (text.toLowerCase().includes("withdraw") || text.toLowerCase().includes("idr")) {
                response.content = "Untuk withdraw ke Rupiah:\n\n1. Pergi ke menu Withdraw\n2. Masukkan jumlah USDC\n3. Konfirmasi rekening bank\n4. Klik Confirm\n\nProses menggunakan IDRX bridge dengan fee 0.5%. Dana sampai dalam 1-5 menit!";
            } else {
                response.content = "I can help you with:\n\n• Vault safety analysis\n• Yield optimization strategies\n• Withdrawal guidance\n• Risk assessment\n\nAsk me anything about DeFi!";
            }

            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-screen relative bg-[var(--obsidian-base)]">
            {/* Header */}
            <header className="h-16 border-b border-white/[0.05] flex items-center justify-between px-6 bg-[var(--obsidian-base)]/80 backdrop-blur-md shrink-0 absolute top-0 w-full z-20">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Bot size={18} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                Shieldie AI
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">BETA</span>
                            </h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] text-emerald-400 font-medium">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto px-4 pt-24 pb-4 md:px-0">
                <div className="max-w-3xl mx-auto flex flex-col gap-6">
                    {/* Date Divider */}
                    <div className="flex justify-center">
                        <span className="text-[10px] font-bold text-[#A1A1AA] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05] uppercase tracking-wider">
                            Today
                        </span>
                    </div>

                    {/* Messages */}
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            {/* Avatar */}
                            {msg.role === "assistant" ? (
                                <div className="w-8 h-8 rounded-lg bg-[var(--obsidian-uplift)] border border-white/[0.1] flex items-center justify-center shrink-0">
                                    <Sparkles size={14} className="text-purple-400" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0">
                                    <User size={14} className="text-white" />
                                </div>
                            )}

                            {/* Message Content */}
                            <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : ""}`}>
                                <div className={`flex items-baseline gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <span className="text-xs font-bold text-white">
                                        {msg.role === "assistant" ? "Shieldie AI" : "You"}
                                    </span>
                                    <span className="text-[10px] text-[#52525B]">{msg.time}</span>
                                </div>
                                <div className={`text-sm leading-relaxed p-4 rounded-2xl shadow-sm ${msg.role === "user"
                                    ? "bg-white/[0.05] border border-white/[0.05] text-white rounded-tr-none"
                                    : "bg-[var(--obsidian-uplift)] border border-white/[0.05] text-[#D4D4D8] rounded-tl-none"
                                    }`}>
                                    <p className="whitespace-pre-line">{msg.content}</p>
                                </div>

                                {/* Embedded Card */}
                                {msg.card && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-2 bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-4 w-full md:w-80 hover:border-purple-500/30 transition-colors group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Shield size={16} className="text-purple-400" />
                                                <span className="text-sm font-bold text-white">{msg.card.title}</span>
                                            </div>
                                            <span className="bg-purple-500/10 text-purple-400 text-xs px-2 py-0.5 rounded font-bold border border-purple-500/20">
                                                {msg.card.score}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {msg.card.items.map((item, j) => (
                                                <div key={j}>
                                                    <div className="flex justify-between text-xs mb-1.5">
                                                        <span className="text-[#A1A1AA]">{item.label}</span>
                                                        <span className="text-white font-medium">{item.value}</span>
                                                    </div>
                                                    <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.percent}%` }}
                                                            transition={{ duration: 1, delay: 0.5 }}
                                                            className="h-full rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="mt-4 w-full py-2 bg-white/[0.03] text-xs text-white font-medium rounded-lg hover:bg-white/[0.08] transition-colors border border-white/[0.05] flex items-center justify-center gap-1 group-hover:text-purple-400">
                                            Full Report
                                            <ArrowUpRight size={12} />
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-start gap-4"
                        >
                            <div className="w-8 h-8 rounded-lg bg-[var(--obsidian-uplift)] border border-white/[0.1] flex items-center justify-center">
                                <Sparkles size={14} className="text-purple-400" />
                            </div>
                            <div className="flex items-center gap-1 mt-3">
                                <div className="w-1.5 h-1.5 bg-[#52525B] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-[#52525B] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-[#52525B] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} className="h-2" />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-[var(--obsidian-base)] border-t border-white/[0.05] relative z-20">
                <div className="max-w-3xl mx-auto space-y-4">
                    {/* Quick Prompts */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {quickPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(prompt)}
                                className="whitespace-nowrap px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.08] text-xs font-medium text-[#A1A1AA] hover:text-white hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>

                    {/* Input Box */}
                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500 blur-sm" />
                        <div className="relative flex items-end gap-2 bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-2 group-focus-within:border-purple-500/30 transition-all">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                                placeholder="Ask Shieldie about your strategy..."
                                rows={1}
                                className="w-full bg-transparent border-none text-white placeholder-[#52525B] focus:ring-0 resize-none py-3 px-3 text-sm outline-none leading-relaxed"
                                style={{ minHeight: '44px', maxHeight: '128px' }}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="p-2.5 bg-white text-black rounded-lg hover:bg-[#E4E4E7] transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
                            >
                                <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-[10px] text-[#52525B] font-mono">
                        AI can make mistakes. Dyer.
                    </p>
                </div>
            </div>
        </div>
    );
}
