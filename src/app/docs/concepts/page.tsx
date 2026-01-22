"use client";

import { Cube, ArrowsClockwise, ChartBar, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { DocsPageWrapper, DocsHeader, DocsContent, DocsSection, DocsCard } from "@/components/docs";

export default function CoreConceptsPage() {
    return (
        <DocsPageWrapper>
            <DocsHeader
                category="Getting Started"
                title="Core Concepts"
                subtitle="Understand the fundamental building blocks of Vultara: Vaults, Strategies, and Epochs."
            />

            <DocsContent>
                {/* Section 1: The Vault */}
                <DocsSection icon={Cube} title="The Vault">
                    <p className="leading-relaxed">
                        In Vultara, a <strong>Vault</strong> is a smart contract where you deposit your ETH. Think of it as a communal savings pot.
                        Instead of your money sitting idle, the Vault puts it to work automatically.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <DocsCard title="Pooled Liquidity">
                            Your ETH is combined with others to execute larger, institutional-grade strategies.
                        </DocsCard>
                        <DocsCard title="Auto-Compounding">
                            Yield earned is automatically added back to your balance, accelerating growth over time.
                        </DocsCard>
                    </ul>
                </DocsSection>

                {/* Section 2: Epochs */}
                <DocsSection icon={ArrowsClockwise} iconColor="#3b82f6" title="Epochs (Weekly Cycles)">
                    <p className="leading-relaxed">
                        Vultara operates on <strong>Weekly Epochs</strong>. This is the duration of one options strategy round.
                    </p>
                    <div className="glass-panel p-6 rounded-xl border border-[var(--border-subtle)] relative overflow-hidden mt-4">
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
                                NOTE: Funds are locked during an Epoch. You must "Schedule Withdrawal" to exit. Funds become claimable on the next Friday.
                            </div>
                        </div>
                    </div>
                </DocsSection>

                {/* Section 3: The Strategy */}
                <DocsSection icon={ChartBar} iconColor="#a855f7" title="The Strategy">
                    <p className="leading-relaxed">
                        Vultara primarily utilizes <strong>covered options strategies</strong> (facilitated by Thetanuts Finance) to generate yield.
                        We sell "volatility" to market makers who pay a premium for it.
                    </p>
                    <div className="mt-4">
                        <Link href="/docs/yield" className="text-[var(--volt)] hover:text-white font-bold inline-flex items-center gap-2 transition-colors">
                            Deep dive into Yield Mechanics <ArrowRight size={16} />
                        </Link>
                    </div>
                </DocsSection>
            </DocsContent>
        </DocsPageWrapper>
    );
}
