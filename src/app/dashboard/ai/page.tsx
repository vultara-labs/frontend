"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PaperPlaneTilt, Alien, User, ShieldCheck, ArrowRight, Wallet, ArrowCircleDown, ArrowCircleUp, ArrowCircleUpRight } from "@phosphor-icons/react";
import { QUICK_PROMPTS, DEMO } from "@/constants";
import { formatTime } from "@/lib/formatters";
import type { Message, ActionData } from "@/types";

const initialMessages: Message[] = [
    {
        role: "assistant",
        content: "Hey! I'm Nova, your DeFi advisor. Ask me anything about Vultara, yield strategies, or just chat about crypto. What's on your mind?",
        time: "Now",
    },
];

export default function AIAdvisorPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = async (messageText?: string) => {
        const text = messageText || input;
        if (!text.trim()) return;

        const userMessage: Message = { role: "user", content: text, time: formatTime() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const history = messages.map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const mockUserData = {
                balance: DEMO.USER_BALANCE,
                earnings: DEMO.TOTAL_EARNINGS,
                apy: 4.5,
            };

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, history, userData: mockUserData }),
            });

            if (!res.ok) throw new Error("API request failed");

            const data = await res.json();

            const assistantMessage: Message = {
                role: "assistant",
                content: data.response || "I apologize, I couldn't process that request. Please try again.",
                time: formatTime(),
            };

            const lowerResponse = data.response?.toLowerCase() || "";
            const lowerQuestion = text.toLowerCase();
            const isRiskQuestion = lowerQuestion.includes("risk") || lowerQuestion.includes("safe") || lowerQuestion.includes("audit") || lowerQuestion.includes("aman");
            const isRiskResponse = lowerResponse.includes("risk assessment") || lowerResponse.includes("safety score") || lowerResponse.includes("certik");

            if (isRiskQuestion && isRiskResponse) {
                assistantMessage.card = {
                    title: "Safety Score",
                    score: "8.5 / 10",
                    items: [
                        { label: "Audit Status", value: "Pass (CertiK)", percent: 100, color: "#CCFF00" },
                        { label: "Volatility", value: "Low", percent: 15, color: "#10B981" },
                    ],
                };
            }

            if (data.action) {
                assistantMessage.action = data.action;
            }

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "I'm having trouble connecting right now. Please try again in a moment.",
                    time: formatTime(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-screen relative bg-[var(--obsidian-base)]">
            <header className="h-14 lg:h-16 border-b border-[var(--border-subtle)] flex items-center justify-between px-4 lg:px-6 bg-[var(--obsidian-base)]/80 backdrop-blur-md shrink-0 absolute top-0 w-full z-20">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center -ml-1">
                            <Alien size={28} weight="duotone" className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                        </div>
                        <div>
                            <h2 className="text-xs lg:text-sm font-bold text-white flex items-center gap-2">
                                Nova
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">BETA</span>
                            </h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                                <span className="text-[10px] text-[var(--success)] font-bold">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 pt-20 lg:pt-24 pb-4 md:px-0">
                <div className="max-w-3xl mx-auto flex flex-col gap-4 lg:gap-6">
                    <div className="flex justify-center">
                        <span className="text-[10px] font-bold text-[var(--text-secondary)] bg-white/[0.03] px-3 py-1 rounded-full border border-[var(--border-subtle)] uppercase tracking-wider">Today</span>
                    </div>

                    {messages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            {msg.role === "assistant" ? (
                                <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center shrink-0 -ml-1">
                                    <Alien size={24} weight="duotone" className="lg:w-[28px] lg:h-[28px] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                                </div>
                            ) : (
                                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-white/[0.05] border border-[var(--border-medium)] flex items-center justify-center shrink-0">
                                    <User size={12} className="lg:w-[14px] lg:h-[14px] text-white" />
                                </div>
                            )}

                            <div className={`flex flex-col gap-1 max-w-[85%] lg:max-w-[80%] ${msg.role === "user" ? "items-end" : ""}`}>
                                <div className={`flex items-baseline gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <span className="text-[10px] lg:text-xs font-bold text-white">{msg.role === "assistant" ? "Nova" : "You"}</span>
                                    <span className="text-[10px] text-[var(--text-tertiary)]">{msg.time}</span>
                                </div>
                                <div className={`text-xs lg:text-sm leading-relaxed p-3 lg:p-4 rounded-2xl shadow-sm ${msg.role === "user" ? "bg-white/[0.05] border border-[var(--border-subtle)] text-white rounded-tr-none" : "bg-[var(--obsidian-uplift)] border border-[var(--border-subtle)] text-[#D4D4D8] rounded-tl-none"}`}>
                                    <p className="whitespace-pre-line">{msg.content}</p>
                                </div>

                                {msg.card && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 bg-[var(--obsidian-surface)] border border-[var(--border-medium)] rounded-xl p-3 lg:p-4 w-full md:w-80 hover:border-purple-500/30 transition-colors group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck size={16} weight="duotone" className="text-purple-400" />
                                                <span className="text-sm font-bold text-white">{msg.card.title}</span>
                                            </div>
                                            <span className="bg-purple-500/10 text-purple-400 text-xs px-2 py-0.5 rounded font-bold border border-purple-500/20">{msg.card.score}</span>
                                        </div>
                                        <div className="space-y-4">
                                            {msg.card.items.map((item, j) => (
                                                <div key={j}>
                                                    <div className="flex justify-between text-xs mb-1.5">
                                                        <span className="text-[#A1A1AA]">{item.label}</span>
                                                        <span className="text-white font-bold">{item.value}</span>
                                                    </div>
                                                    <div className="w-full bg-white/[0.05] h-1 lg:h-1.5 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full" style={{ backgroundColor: item.color }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="mt-3 lg:mt-4 w-full py-2 bg-white/[0.02] text-[10px] lg:text-xs text-[var(--text-tertiary)] font-bold rounded-lg border border-[var(--border-subtle)] flex items-center justify-center gap-2 cursor-not-allowed opacity-60" title="Coming Soon" disabled>
                                            Full Report
                                            <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded">SOON</span>
                                        </button>
                                    </motion.div>
                                )}

                                {msg.action && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-3 p-4 rounded-xl bg-gradient-to-br from-[var(--volt)]/10 to-[var(--volt)]/5 border border-[var(--volt)]/20 w-full md:w-80">
                                        <div className="flex items-center gap-2 mb-3">
                                            {msg.action.type === "deposit" && <ArrowCircleUp size={18} className="text-[var(--volt)]" />}
                                            {msg.action.type === "withdraw" && <ArrowCircleDown size={18} className="text-[var(--info)]" />}
                                            {msg.action.type === "balance" && <Wallet size={18} className="text-[var(--volt)]" />}
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Quick Action</span>
                                        </div>

                                        {msg.action.type === "deposit" && msg.action.amount && (
                                            <Link href={`/dashboard/deposit?amount=${msg.action.amount}`} className="w-full py-2.5 px-4 rounded-lg bg-[var(--volt)] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
                                                Deposit ${msg.action.amount.toLocaleString()} USDC
                                                <ArrowRight size={14} weight="bold" />
                                            </Link>
                                        )}

                                        {msg.action.type === "withdraw" && msg.action.amount && (
                                            <Link href={`/dashboard/withdraw?amount=${msg.action.amount}`} className="w-full py-2.5 px-4 rounded-lg bg-[var(--info)] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
                                                Withdraw ${msg.action.amount.toLocaleString()}
                                                <ArrowRight size={14} weight="bold" />
                                            </Link>
                                        )}

                                        {msg.action.type === "balance" && (
                                            <Link href="/dashboard" className="w-full py-2.5 px-4 rounded-lg bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                                                View Dashboard
                                                <ArrowRight size={14} weight="bold" />
                                            </Link>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 lg:gap-4">
                            <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center -ml-1">
                                <Alien size={24} weight="duotone" className="lg:w-[28px] lg:h-[28px] text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                            </div>
                            <div className="flex items-center gap-1 mt-2 lg:mt-3">
                                <div className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} className="h-2" />
                </div>
            </div>

            <div className="p-3 sm:p-4 lg:p-6 bg-[var(--obsidian-base)] border-t border-[var(--border-subtle)] relative z-20">
                <div className="max-w-3xl mx-auto space-y-3 lg:space-y-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {QUICK_PROMPTS.map((prompt, i) => (
                            <button key={i} onClick={() => handleSend(prompt)} className="whitespace-nowrap px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-white/[0.02] border border-[var(--border-medium)] text-[10px] lg:text-xs font-bold text-[var(--text-secondary)] hover:text-white hover:border-purple-500/50 hover:bg-purple-500/5 transition-all">
                                {prompt}
                            </button>
                        ))}
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500 blur-sm" />
                        <div className="relative flex items-end gap-2 bg-[var(--obsidian-surface)] border border-[var(--border-medium)] rounded-xl p-2 group-focus-within:border-purple-500/30 transition-all">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                                placeholder="Ask Nova anything..."
                                rows={1}
                                className="w-full bg-transparent border-none text-white placeholder-[var(--text-tertiary)] focus:ring-0 resize-none py-2 lg:py-3 px-2 lg:px-3 text-sm outline-none leading-relaxed"
                                style={{ minHeight: "40px", maxHeight: "128px" }}
                            />
                            <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="p-2.5 bg-white text-black rounded-lg hover:bg-[#E4E4E7] transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed mb-0.5">
                                <ArrowCircleUpRight size={18} weight="bold" />
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-[10px] text-[var(--text-tertiary)] font-mono">AI can make mistakes. DYOR.</p>
                </div>
            </div>
        </div>
    );
}
