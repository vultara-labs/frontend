"use client";

import { Box, RefreshCw, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CoreConceptsPage() {
    return (
        <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
            {/* Header */}
            <div className="border-b border-[var(--border-subtle)] pb-8">
                <p className="text-[var(--volt)] font-bold uppercase tracking-widest text-xs mb-3">
                    Getting Started
                </p>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
                    Core Concepts
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Understand the fundamental building blocks of Vultara: Vaults, Strategies, and Epochs.
                </p>
            </div>

            {/* Content Body */}
            <div className="space-y-16 text-[var(--text-secondary)]">

                {/* Section 1: The Vault */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--volt)]/10 flex items-center justify-center text-[var(--volt)]">
                            <Box size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">The Vault</h2>
                    </div>
                    <p className="leading-relaxed text-[var(--text-body-lg)]">
                        In Vultara, a <strong>Vault</strong> is a smart contract where you deposit your USDC. Think of it as a communal savings pot.
                        Instead of your money sitting idle, the Vault puts it to work automatically.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="p-4 bg-[var(--obsidian-surface)] rounded-xl border border-[var(--border-subtle)]">
                            <strong className="text-white block mb-2">Pooled Liquidity</strong>
                            <span className="text-sm">Your USDC is combined with others to execute larger, institutional-grade strategies.</span>
                        </li>
                        <li className="p-4 bg-[var(--obsidian-surface)] rounded-xl border border-[var(--border-subtle)]">
                            <strong className="text-white block mb-2">Auto-Compounding</strong>
                            <span className="text-sm">Yield earned is automatically added back to your balance, accelerating growth over time.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 2: Epochs */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <RefreshCw size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Epochs (Weekly Cycles)</h2>
                    </div>
                    <p className="leading-relaxed text-[var(--text-body-lg)]">
                        Vultara operates on <strong>Weekly Epochs</strong>. This is the duration of one options strategy round.
                    </p>
                    <div className="glass-panel p-6 rounded-xl border border-[var(--border-subtle)] relative overflow-hidden">
                        <div className="relative z-10 space-y-4">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <h4 className="text-white font-bold mb-2">Friday: Start</h4>
                                    <p className="text-sm">Strategists execute the options trade. Funds are "locked" into the strategy.</p>
                                </div>
                                <div className="hidden md:flex items-center justify-center text-[var(--text-tertiary)]">
                                    <ArrowRight />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold mb-2">Next Friday: Expiry</h4>
                                    <p className="text-sm">Options expire. Yield is calculated and distributed. A new Epoch begins.</p>
                                </div>
                            </div>
                            <div className="text-xs text-[var(--warning)] bg-[var(--warning)]/10 p-3 rounded-lg inline-block font-bold tracking-wide mt-2">
                                NOTE: Withdrawals requested during an active Epoch are processed at the end of the cycle.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: The Strategy */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <BarChart3 size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white">The Strategy</h2>
                    </div>
                    <p className="leading-relaxed text-[var(--text-body-lg)]">
                        Vultara primarily utilizes <strong>covered options strategies</strong> (facilitated by Thetanuts Finance) to generate yield.
                        We sell "volatility" to market makers who pay a premium for it.
                    </p>
                    <div className="mt-4">
                        <Link href="/docs/yield" className="text-[var(--volt)] hover:text-white font-bold inline-flex items-center gap-2 transition-colors">
                            Deep dive into Yield Mechanics <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
