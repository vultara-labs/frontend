"use client";

import { Blueprint, Lock, ShieldCheck, Code, Warning, CurrencyCircleDollar } from "@phosphor-icons/react";
import { DocsPageWrapper, DocsHeader, DocsContent, DocsSection, DocsStep, DocsTable, DocsCard } from "@/components/docs";

export default function ArchitecturePage() {
    return (
        <DocsPageWrapper>
            <DocsHeader
                category="Protocol"
                title="Vault Architecture"
                subtitle="Technical documentation for advanced users and auditors."
            />

            <DocsContent>
                {/* Contract Overview */}
                <DocsSection icon={Blueprint} title="Contract Overview">
                    <DocsTable rows={[
                        { label: "Contract", value: "VultaraETHVault" },
                        { label: "Network", value: "Base (Testnet: Base Sepolia)" },
                        { label: "Token Symbol", value: "vETH", highlight: true },
                        { label: "Share Ratio", value: "1:1 (ETH : vETH)" },
                        { label: "Min Deposit", value: "0.001 ETH" },
                    ]} />
                </DocsSection>

                {/* Architecture Flow */}
                <DocsSection icon={CurrencyCircleDollar} iconColor="#22c55e" title="Architecture Flow">
                    <div className="space-y-4">
                        <DocsStep step={1} title="User Deposits ETH" description="Native ETH sent to VultaraETHVault.deposit()" />
                        <DocsStep step={2} title="Vault Mints vETH Shares" description="ERC20 shares minted 1:1 with ETH deposited" />
                        <DocsStep step={3} title="Strategy Execution (Automated)" description="Owner triggers Thetanuts v4 OptionBook.fillOrder()" />
                        <DocsStep step={4} title="Premiums Accrue to Vault" description="Options premiums increase vault TVL" />
                        <DocsStep step={5} title="User Withdraws ETH + Yield" description="Burns vETH, receives proportional ETH" color="#22c55e" />
                    </div>
                </DocsSection>

                {/* Key Functions */}
                <DocsSection icon={Code} iconColor="#a855f7" title="Key Functions">
                    <div className="space-y-4">
                        <DocsCard title="deposit() payable">
                            Accepts native ETH. Mints vETH shares 1:1. Minimum 0.001 ETH.
                        </DocsCard>
                        <DocsCard title="withdraw(uint256 shares)">
                            Burns vETH shares and returns proportional ETH. Requires sufficient liquidity.
                        </DocsCard>
                        <DocsCard title="executeStrategy(Order, signature) onlyOwner">
                            Triggers Thetanuts v4 OptionBook to fill cash-secured put orders. Owner-only.
                        </DocsCard>
                        <DocsCard title="getTVL() → uint256">
                            Returns total ETH held by the vault contract.
                        </DocsCard>
                    </div>
                </DocsSection>

                {/* Security Considerations */}
                <DocsSection icon={ShieldCheck} iconColor="#22c55e" title="Security Considerations">
                    <div className="space-y-3">
                        <DocsCard title="ReentrancyGuard" variant="success">
                            Protects deposit/withdraw from reentrancy attacks
                        </DocsCard>
                        <DocsCard title="Ownable" variant="success">
                            Strategy execution restricted to owner (prevents malicious draining)
                        </DocsCard>
                        <DocsCard title="Non-Custodial" variant="success">
                            Users can withdraw anytime (if liquidity available)
                        </DocsCard>
                        <DocsCard title="Liquidity Lock Risk" variant="warning">
                            If strategy is active, withdrawal may fail temporarily
                        </DocsCard>
                    </div>
                </DocsSection>

                {/* Thetanuts Integration */}
                <DocsSection icon={Lock} iconColor="#3b82f6" title="Thetanuts v4 Integration">
                    <p className="text-sm leading-relaxed mb-4">
                        Vultara integrates with Thetanuts Finance v4 <code className="text-[var(--volt)]">OptionBook</code> to execute cash-secured put strategies.
                    </p>
                    <div className="p-4 rounded-xl bg-black/30 border border-[var(--border-subtle)]">
                        <p className="text-xs text-[var(--text-tertiary)] font-mono mb-2">OptionBook Address (Base)</p>
                        <code className="text-[var(--volt)] text-xs break-all">0xd58b814C7Ce700f251722b5555e25aE0fa8169A1</code>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-4 italic">
                        Note: Full production integration requires WETH wrapping for ERC20 compatibility.
                    </p>
                </DocsSection>

                {/* Deployed Contracts */}
                <DocsSection icon={Blueprint} title="Deployed Contracts">
                    <DocsTable rows={[
                        { label: "Base Sepolia", value: <code className="text-[var(--volt)] text-xs">0x3C90E5477C9016eec4c48b9886a1Bc3c1c5C5bBa</code>, highlight: false },
                        { label: "Base Mainnet", value: <span className="text-[var(--text-tertiary)] text-xs italic">Coming soon</span> },
                    ]} />
                </DocsSection>
            </DocsContent>
        </DocsPageWrapper>
    );
}
