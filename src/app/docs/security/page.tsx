"use client";

import { ShieldWarning, ShieldCheck, Lock } from "@phosphor-icons/react";
import Link from "next/link";
import { DocsPageWrapper, DocsHeader, DocsContent, DocsSection, DocsCard } from "@/components/docs";

export default function SecurityPage() {
    return (
        <DocsPageWrapper>
            <DocsHeader
                category="Protocol"
                title="Security & Risks"
                subtitle="Transparency is our priority. Understanding the risks is as important as understanding the rewards."
            />

            <DocsContent>
                <DocsSection icon={ShieldCheck} iconColor="#22c55e" title="Security Measures">
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
                </DocsSection>

                <DocsSection icon={ShieldWarning} iconColor="#f59e0b" title="Risk Disclosure">
                    <div className="space-y-4">
                        <DocsCard title="Smart Contract Risk" variant="warning">
                            While audited, no code is 100% bug-free. A critical vulnerability in the underlying smart contracts could result in a loss of funds.
                        </DocsCard>
                        <DocsCard title='Market Risk (The "Dip")' variant="warning">
                            Our options strategies involve selling Puts. If the market crashes significantly below the Strike Price during an epoch, the vault may incur a loss.
                        </DocsCard>
                        <DocsCard title="Volatility Risk">
                            Vultara holds your deposits in ETH. The dollar value of your holdings fluctuates with ETH market price movements.
                        </DocsCard>
                    </div>
                </DocsSection>

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
            </DocsContent>
        </DocsPageWrapper>
    );
}
