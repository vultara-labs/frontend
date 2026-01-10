"use client";

import { PieChart, TrendingUp, DollarSign } from "lucide-react";

export default function YieldMechanicsPage() {
    return (
        <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
            {/* Header */}
            <div className="border-b border-[var(--border-subtle)] pb-8">
                <p className="text-[var(--volt)] font-bold uppercase tracking-widest text-xs mb-3">
                    Protocol
                </p>
                <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
                    Yield Mechanics
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    Where does the money come from? A transparent look at our Real Yield generation.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-12 text-[var(--text-secondary)]">

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">No Inflationary Tokens</h2>
                    <p className="leading-relaxed mb-6">
                        Most DeFi yield comes from protocol emissions (printing new tokens). This dilutes supply and crashes prices.
                        <strong>Vultara is different.</strong> Our yield is paid in USDC, generated from actual market activity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card-solid p-6 rounded-xl border border-red-500/20 bg-red-500/5">
                            <h4 className="text-red-400 font-bold mb-2 uppercase text-xs tracking-widest">Traditional DeFi</h4>
                            <p className="text-sm font-medium text-white">Yield = Printed Tokens</p>
                            <p className="text-xs mt-2 opacity-70">Unsustainable. Prices crash when printing stops.</p>
                        </div>
                        <div className="md:col-span-2 card-solid p-6 rounded-xl border border-[var(--volt)]/20 bg-[var(--volt)]/5">
                            <h4 className="text-[var(--volt)] font-bold mb-2 uppercase text-xs tracking-widest">Vultara Model</h4>
                            <p className="text-sm font-medium text-white">Yield = Market Premiums</p>
                            <p className="text-xs mt-2 opacity-70">Sustainable. Paid by market makers for liquidity.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">The "Short Put" Strategy</h2>
                    <p className="leading-relaxed mb-6">
                        Specifically, our USDC Vault sells <strong>Out-of-the-Money (OTM) Put Options</strong> on ETH or BTC.
                        Here is the simplified flow:
                    </p>

                    <div className="space-y-4">
                        {[
                            {
                                step: "1",
                                title: "Deposit Collateral",
                                desc: "Your USDC is locked in the vault as collateral."
                            },
                            {
                                step: "2",
                                title: "Sell Options",
                                desc: "The vault sells 'Put Options' to Market Makers. They pay us an upfront cash fee (Premium)."
                            },
                            {
                                step: "3",
                                title: "Collect Premium",
                                desc: "This Premium is immediately added to the vault. This is your yield."
                            },
                            {
                                step: "4",
                                title: "Expiry Check",
                                desc: "If the market price stays above the Strike Price (which is set very low/safe), the options expire worthless. We keep the collateral + premium."
                            }
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-[var(--obsidian-uplift)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--volt)] font-bold font-mono text-sm shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{item.title}</h4>
                                    <p className="text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-[var(--obsidian-uplift)] p-6 rounded-xl border border-[var(--border-subtle)]">
                    <div className="flex gap-4 items-start">
                        <TrendingUp className="text-[var(--volt)] flex-shrink-0" />
                        <div>
                            <h4 className="text-white font-bold mb-2">Example Scenario</h4>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                ETH is at $4,000. We sell a "Put Option" with a Strike Price of $3,500 expiring in 7 days.
                                <br /><br />
                                Someone pays us $10 today for this contract.
                                <br /><br />
                                <strong>Scenario A (Most Likely):</strong> ETH price stays above $3,500. We keep our collateral + the $10 profit.
                                <br />
                                <strong>Scenario B (Crash):</strong> ETH crashes below $3,500. We may have to buy ETH at $3,500 (using the collateral), effectively "buying the dip".
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
