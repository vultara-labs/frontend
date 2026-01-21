"use client";

import { Info, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { DocsPageWrapper, DocsHeader, DocsContent, DocsInfoBox } from "@/components/docs";

export default function DocsIntroductionPage() {
    return (
        <DocsPageWrapper>
            <DocsHeader
                category="Getting Started"
                title="Introduction to Vultara"
                subtitle="Vultara is the simplest way to earn real, sustainable yield on your ETH through institutional-grade options strategies on Base."
            />

            <DocsContent>
                <p className="leading-relaxed">
                    Traditional DeFi yield farming is broken. It's often complicated, risky, and reliant on inflationary token emissions (Ponzi-nomics).
                    Vultara changes this by identifying a clear, sustainable source of yield: <strong>Options Premiums</strong>.
                </p>

                <DocsInfoBox icon={Info} title="Why Vultara?">
                    We abstract away the complexity of managing options vaults. You don't need to understand "Delta", "Theta", or "Strike Prices".
                    You simply deposit ETH, and our protocol (powered by Thetanuts) automates the strategy for you.
                </DocsInfoBox>

                <div className="pt-4">
                    <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                    <ul className="space-y-4">
                        {[
                            "Principal Protection logic embedded in strategy selection.",
                            "Weekly epochs for optimized compounding.",
                            "Non-custodial smart contracts audited by top firms.",
                            "Nova AI Advisor to explain risks in real-time."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="text-[var(--volt)] mt-1 flex-shrink-0" size={20} weight="fill" />
                                <span className="leading-relaxed font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-4 w-full">
                    <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/docs/concepts" className="group p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--obsidian-surface)] hover:border-[var(--volt)]/50 transition-all">
                            <h4 className="text-white font-bold mb-2 group-hover:text-[var(--volt)] transition-colors">Core Concepts &rarr;</h4>
                            <p className="text-sm">Learn about Vaults, Epochs, and how the yield is generated.</p>
                        </Link>
                        <Link href="/dashboard" className="group p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--obsidian-surface)] hover:border-[var(--volt)]/50 transition-all">
                            <h4 className="text-white font-bold mb-2 group-hover:text-[var(--volt)] transition-colors">Start Earning &rarr;</h4>
                            <p className="text-sm">Jump straight into the app and deposit your first ETH.</p>
                        </Link>
                    </div>
                </div>
            </DocsContent>
        </DocsPageWrapper>
    );
}
