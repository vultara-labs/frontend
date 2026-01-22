"use client";

import { TrendUp, Coins, Lightning } from "@phosphor-icons/react";
import { DocsPageWrapper, DocsHeader, DocsContent, DocsSection, DocsStep, DocsCard } from "@/components/docs";

export default function YieldMechanicsPage() {
    return (
        <DocsPageWrapper>
            <DocsHeader
                category="Protocol"
                title="Yield Mechanics"
                subtitle="Where does the money come from? A transparent look at our Real Yield generation."
            />

            <DocsContent>
                <DocsSection icon={Coins} iconColor="#ef4444" title="No Inflationary Tokens">
                    <p className="leading-relaxed mb-6">
                        Most DeFi yield comes from protocol emissions (printing new tokens). This dilutes supply and crashes prices.
                        <strong> Vultara is different.</strong> Our yield is paid in ETH, generated from actual market activity.
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
                </DocsSection>

                <DocsSection icon={Lightning} iconColor="#a855f7" title='The "Short Put" Strategy'>
                    <p className="leading-relaxed mb-6">
                        Specifically, our ETH Vault sells <strong>Covered Call Options</strong> on ETH.
                        Here is the simplified flow:
                    </p>
                    <div className="space-y-4">
                        <DocsStep step={1} title="Deposit Collateral" description="Your ETH is locked in the vault as collateral." />
                        <DocsStep step={2} title="Sell Options" description='The vault sells "Put Options" to Market Makers. They pay us an upfront cash fee (Premium).' />
                        <DocsStep step={3} title="Collect Premium" description="Premium increases Vault assets. This pumps the Share Price (You own more ETH)." />
                        <DocsStep step={4} title="Expiry Check" description='If the market price stays above the Strike Price (which is set very low/safe), the options expire worthless. We keep the collateral + premium.' />
                    </div>
                </DocsSection>

                <section className="bg-[var(--obsidian-uplift)] p-6 rounded-xl border border-[var(--border-subtle)]">
                    <div className="flex gap-4 items-start">
                        <TrendUp className="text-[var(--volt)] flex-shrink-0" weight="duotone" />
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
            </DocsContent>
        </DocsPageWrapper>
    );
}
