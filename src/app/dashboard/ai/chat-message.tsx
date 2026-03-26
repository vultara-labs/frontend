"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Alien, User, ShieldCheck, ArrowRight, Wallet } from "@phosphor-icons/react";
import type { Message } from "@/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "./markdown-components";

export function ChatMessage({ msg }: { msg: Message }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" ? (
                <div className="w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center shrink-0 -ml-1 mt-1">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full" />
                        <Alien size={24} weight="duotone" className="relative z-10 lg:w-[28px] lg:h-[28px] text-amber-500" />
                    </div>
                </div>
            ) : (
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} weight="bold" className="text-white" />
                </div>
            )}

            <div className={`flex flex-col gap-1 max-w-[85%] lg:max-w-[80%] ${msg.role === "user" ? "items-end" : ""}`}>
                <div className={`p-4 rounded-2xl shadow-sm backdrop-blur-md ${msg.role === "user" ? "bg-[var(--volt)] text-black rounded-tr-sm" : "bg-white/[0.08] border border-white/10 text-gray-100 rounded-tl-sm"} overflow-hidden`}>
                    {msg.role === "user" ? (
                        <p className="text-base leading-relaxed whitespace-pre-line tracking-tight font-medium">{msg.content}</p>
                    ) : (
                        <div className="markdown-content text-base leading-relaxed tracking-tight">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {msg.card && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-2 bg-[var(--obsidian-surface)] border border-[var(--border-medium)] rounded-xl p-4 lg:p-5 w-full md:w-96 hover:border-purple-500/30 transition-colors group">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck size={18} weight="duotone" className="text-purple-400" />
                                <span className="text-base font-bold text-white">{msg.card.title}</span>
                            </div>
                            <span className="bg-purple-500/10 text-purple-400 text-xs px-2.5 py-1 rounded-md font-bold border border-purple-500/20">{msg.card.score}</span>
                        </div>
                        <div className="space-y-5">
                            {msg.card.items.map((item, j) => (
                                <div key={j}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[#A1A1AA] font-medium">{item.label}</span>
                                        <span className="text-white font-bold">{item.value}</span>
                                    </div>
                                    <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full rounded-full" style={{ backgroundColor: item.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {msg.action && (
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-3 p-4 rounded-xl bg-gradient-to-br from-[var(--volt)]/10 to-[var(--volt)]/5 border border-[var(--volt)]/20 w-full md:w-80">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Quick Action</span>
                        </div>

                        {msg.action.type === "deposit" && msg.action.amount && (
                            <Link href={`/dashboard/deposit?amount=${msg.action.amount}`} className="w-full py-2.5 px-4 rounded-lg bg-[var(--volt)] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
                                Deposit {msg.action.amount} ETH
                                <ArrowRight size={14} weight="bold" />
                            </Link>
                        )}

                        {msg.action.type === "withdraw" && msg.action.amount && (
                            <Link href={`/dashboard/withdraw?amount=${msg.action.amount}`} className="w-full py-2.5 px-4 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
                                Withdraw {msg.action.amount} ETH
                                <ArrowRight size={14} weight="bold" />
                            </Link>
                        )}

                        {msg.action.type === "balance" && (
                            <Link href="/dashboard" className="w-full py-2.5 px-4 rounded-lg bg-[var(--obsidian-surface)] border border-[var(--border-light)] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] transition-all">
                                View Portfolio
                                <Wallet size={14} weight="bold" />
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
