"use client";

import { ShieldAlert, ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";

export default function SecurityPage() {
    return (
        <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
            {/* Header */}
            <div className="border-b border-[var(--border-subtle)] pb-8">
                <p className="text-[var(--volt)] font-bold uppercase tracking-widest text-xs mb-3">
                    Protocol
                </p>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
                    Security & Risks
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Transparency is our priority. Understanding the risks is as important as understanding the rewards.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-16 text-[var(--text-secondary)]">

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Security Measures</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-panel p-6 rounded-xl border border-[var(--border-subtle)]">
                            <ShieldCheck className="text-[var(--success)] mb-4" size={32} />
                            <h3 className="text-white font-bold text-lg mb-2">Audited Contracts</h3>
                            <p className="text-sm">
                                Vultara builds on top of <strong>Thetanuts Finance</strong> v3 protocols, which have undergone rigorous audits by top firms like Peckshield and Sherlock.
                            </p>
                        </div>
                        <div className="glass-panel p-6 rounded-xl border border-[var(--border-subtle)]">
                            <Lock className="text-blue-400 mb-4" size={32} />
                            <h3 className="text-white font-bold text-lg mb-2">Non-Custodial</h3>
                            <p className="text-sm">
                                We never hold your funds. You interact directly with smart contracts on the Base blockchain. You maintain full ownership of your assets.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <ShieldAlert className="text-[var(--warning)]" />
                        Risk Disclosure
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-[var(--obsidian-surface)] p-6 rounded-xl border border-red-500/20">
                            <h4 className="text-white font-bold mb-2">Smart Contract Risk</h4>
                            <p className="text-sm mb-0">
                                While audited, no code is 100% bug-free. A critical vulnerability in the underlying smart contracts could result in a loss of funds.
                            </p>
                        </div>

                        <div className="bg-[var(--obsidian-surface)] p-6 rounded-xl border border-[var(--warning)]/20">
                            <h4 className="text-white font-bold mb-2">Market Risk (The "Dip")</h4>
                            <p className="text-sm mb-0">
                                Our options strategies involve selling Puts. If the market crashes significantly below the Strike Price during an epoch, the vault may incur a loss (buying assets at a price higher than market value).
                            </p>
                        </div>

                        <div className="bg-[var(--obsidian-surface)] p-6 rounded-xl border border-[var(--border-subtle)]">
                            <h4 className="text-white font-bold mb-2">Peg Risk</h4>
                            <p className="text-sm mb-0">
                                Vultara relies on USDC. While highly stable, any de-pegging event of USDC would affect the dollar value of your deposits.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-[var(--volt)]/5 border border-[var(--volt)]/20 p-8 rounded-2xl text-center">
                        <h3 className="text-white font-bold text-xl mb-3">Still have questions?</h3>
                        <p className="mb-6 max-w-lg mx-auto">
                            Our AI Advisor, Nova, is trained on all these risk parameters. You can ask her specifically about current vault health and risk levels.
                        </p>
                        <Link href="/dashboard/ai" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg">
                            Ask Nova about Risk
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}
