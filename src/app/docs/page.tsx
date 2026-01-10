"use client";

import { ArrowRight, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DocsIntroductionPage() {
    return (
        <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
            {/* Header */}
            <div className="border-b border-[var(--border-subtle)] pb-8">
                <p className="text-[var(--volt)] font-bold uppercase tracking-widest text-xs mb-3">
                    Getting Started
                </p>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
                    Introduction to Vultara
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Vultara is the simplest way to earn real, sustainable yield on your USDC through institutional-grade options strategies on Base.
                </p>
            </div>

            {/* Content Body */}
            <div className="space-y-8 text-[var(--text-secondary)]">
                <p className="leading-relaxed">
                    Traditional DeFi yield farming is broken. It's often complicated, risky, and reliant on inflationary token emissions (Ponzi-nomics).
                    Vultara changes this by identifying a clear, sustainable source of yield: <strong>Options Premiums</strong>.
                </p>

                <div className="glass-panel p-6 rounded-xl border border-[var(--volt)]/20 bg-[var(--volt)]/5 relative overflow-hidden">
                    <div className="flex gap-4">
                        <Info className="flex-shrink-0 text-[var(--volt)]" size={24} />
                        <div className="space-y-2">
                            <h3 className="text-white font-bold text-lg">Why Vultara?</h3>
                            <p className="text-sm leading-relaxed text-[var(--text-primary)]/80">
                                We abstract away the complexity of managing options vaults. You don't need to understand "Delta", "Theta", or "Strike Prices".
                                You simply deposit USDC, and our protocol (powered by Thetanuts) automates the strategy for you.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                    <ul className="space-y-4">
                        {[
                            "Principal Protection logic embedded in strategy selection.",
                            "Weekly epochs for optimized compounding.",
                            "Non-custodial smart contracts audited by top firms.",
                            "Nova AI Advisor to explain risks in real-time."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="text-[var(--volt)] mt-1 flex-shrink-0" size={20} />
                                <span className="leading-relaxed font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-8 w-full">
                    <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/docs/concepts" className="group p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--obsidian-surface)] hover:border-[var(--volt)]/50 transition-all">
                            <h4 className="text-white font-bold mb-2 group-hover:text-[var(--volt)] transition-colors">Core Concepts &rarr;</h4>
                            <p className="text-sm">Learn about Vaults, Epochs, and how the yield is generated.</p>
                        </Link>
                        <Link href="/dashboard" className="group p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--obsidian-surface)] hover:border-[var(--volt)]/50 transition-all">
                            <h4 className="text-white font-bold mb-2 group-hover:text-[var(--volt)] transition-colors">Start Earning &rarr;</h4>
                            <p className="text-sm">Jump straight into the app and deposit your first USDC.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
