"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Alien, ArrowRight, Trash } from "@phosphor-icons/react";
import { QUICK_PROMPTS } from "@/constants";
import { formatTime } from "@/lib/formatters";
import { useDashboardData } from "@/hooks";
import type { Message } from "@/types";
import { initialMessages } from "./markdown-components";
import { ChatMessage } from "./chat-message";

export default function AIAdvisorPage() {
    // Get current user data (demo or real based on connection status)
    const {
        isPreviewMode,
        vaultBalanceETH,
        vaultBalanceUSD,
        totalEarningsUSD,
        currentAPY,
    } = useDashboardData();

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // LOAD HISTORY ON MOUNT
    useEffect(() => {
        const savedHistory = localStorage.getItem("vultara_nova_history");
        if (savedHistory) {
            try {
                const parsed = JSON.parse(savedHistory);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            } catch (e) {
                console.error("Failed to parse chat history", e);
            }
        }
    }, []);

    // SAVE HISTORY ON CHANGE (debounced)
    useEffect(() => {
        if (messages.length <= 1) return;
        const timer = setTimeout(() => {
            try {
                const toSave = messages.length > 100 ? messages.slice(-100) : messages;
                localStorage.setItem("vultara_nova_history", JSON.stringify(toSave));
            } catch { /* localStorage full or unavailable */ }
        }, 500);
        return () => clearTimeout(timer);
    }, [messages]);

    const clearHistory = () => {
        localStorage.removeItem("vultara_nova_history");
        setMessages(initialMessages);
    };

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

            // Use real data when connected, demo data when not
            const userData = {
                balance: vaultBalanceUSD,
                balanceETH: vaultBalanceETH,
                earnings: totalEarningsUSD,
                apy: currentAPY,
                isPreviewMode: isPreviewMode,
            };

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, history, userData }),
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
        <div className="flex flex-col h-[100dvh] relative bg-[var(--obsidian-base)]">
            <header className="h-14 lg:h-16 border-b border-[var(--border-subtle)] flex items-center justify-between px-4 lg:px-6 bg-[var(--obsidian-base)]/80 backdrop-blur-md shrink-0 absolute top-0 w-full z-20">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 lg:gap-3">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center -ml-1">
                            <Alien size={28} weight="duotone" className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                        </div>
                        <div>
                            <h2 className="text-xs lg:text-sm font-bold text-white flex items-center gap-2">
                                Nova
                                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">v1.0</span>
                            </h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                                <span className="text-xs text-[var(--success)] font-bold">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={clearHistory}
                    className="p-2 text-[var(--text-tertiary)] hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                    title="Clear History"
                    aria-label="Clear chat history"
                >
                    <Trash size={18} />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 pt-20 lg:pt-24 pb-4 md:px-0">
                <div className="max-w-3xl mx-auto flex flex-col gap-4 lg:gap-6 min-h-full">

                    {/* Message List */}
                    <div className="flex justify-center mb-6">
                        <span className="text-xs font-bold text-[var(--text-secondary)] bg-white/[0.03] px-3 py-1 rounded-full border border-[var(--border-subtle)] uppercase tracking-wider">Session Active</span>
                    </div>

                    {messages.map((msg, i) => (
                        <ChatMessage key={i} msg={msg} />
                    ))}

                    {/* Quick Prompts (Only if just 1 message) */}
                    {messages.length === 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="pl-12 lg:pl-14 pt-2">
                            <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Suggested:</p>
                            <div className="flex flex-wrap gap-2">
                                {QUICK_PROMPTS.map((prompt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(prompt)}
                                        className="text-xs font-bold text-[var(--volt)] bg-[var(--volt)]/10 border border-[var(--volt)]/20 px-3 py-2 rounded-lg hover:bg-[var(--volt)]/20 hover:scale-105 transition-all text-left"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
                            <div className="w-9 h-9 flex items-center justify-center -ml-1">
                                <Alien size={24} weight="duotone" className="text-amber-500 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-1.5 mt-4 p-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} className="h-2" />
                </div>
            </div>

            <div className="p-4 lg:p-6 relative z-20">
                <div className="max-w-3xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-500/20 via-[var(--volt)]/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-700 blur" />
                        <div className="relative flex items-end gap-2 bg-[var(--obsidian-base)] border border-[var(--border-medium)] rounded-2xl p-2 pl-4 group-focus-within:border-white/20 transition-all shadow-2xl">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                                aria-label="Message Nova AI"
                                placeholder='Ask: "Is it safe to deposit right now?"'
                                rows={1}
                                className="w-full bg-transparent border-none text-white placeholder-[var(--text-tertiary)] focus:ring-0 resize-none py-3 px-0 text-base lg:text-sm outline-none leading-relaxed"
                                style={{ minHeight: "44px", maxHeight: "128px" }}
                            />
                            <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="p-3 bg-[var(--volt)] text-black rounded-xl hover:brightness-110 active:scale-95 transition-all shrink-0 disabled:opacity-0 disabled:scale-0 mb-0.5">
                                <ArrowRight size={18} weight="bold" />
                            </button>
                        </div>
                    </div>
                    <p className="mt-3 text-center text-xs text-[var(--text-tertiary)] font-mono opacity-50">Nova Intelligence v1.0 • Vultara Labs</p>
                </div>
            </div>
        </div>
    );
}
