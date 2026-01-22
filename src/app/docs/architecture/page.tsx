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
                        { label: "Share Ratio", value: "Dynamic (ERC-4626 Style)" },
                        { label: "Share Price", value: "Total Assets / Total Supply" },
                        { label: "Min Deposit", value: "0.001 ETH" },
                    ]} />
                </DocsSection>

                {/* Architecture Flow */}
                <DocsSection icon={CurrencyCircleDollar} iconColor="#22c55e" title="Architecture Flow (Lifecycle)">
                    <div className="space-y-4">
                        <DocsStep step={1} title="User Deposits ETH" description="Native ETH sent to VultaraETHVault.deposit(). Mints vETH based on current Share Price." />
                        <DocsStep step={2} title="Strategy Execution" description="Owner triggers Thetanuts v4 fillOrder(). Funds locked for 1 Epoch." />
                        <DocsStep step={3} title="Yield Accrual" description="Premiums added to Vault. Share Price increases (Real Yield)." />
                        <DocsStep step={4} title="User Schedules Withdrawal" description="User calls scheduleWithdraw(). Shares moved to escrow." />
                        <DocsStep step={5} title="Epoch End (Friday)" description="Liquidity unlocked. Pending withdrawals processed." />
                        <DocsStep step={6} title="User Claims Funds" description="User calls claimWithdraw(). Receives ETH (Principal + Yield)." color="#22c55e" />
                    </div>
                </DocsSection>

                {/* Key Functions */}
                <DocsSection icon={Code} iconColor="#a855f7" title="Key Functions">
                    <div className="space-y-4">
                        <DocsCard title="deposit() payable">
                            Accepts native ETH. Mints vETH shares based on current price. Minimum 0.001 ETH.
                        </DocsCard>
                        <DocsCard title="scheduleWithdraw(uint256 shares)">
                            Queues withdrawal request. Shares are escrowed but still earn yield until Epoch end.
                        </DocsCard>
                        <DocsCard title="claimWithdraw()">
                            Claims pending ETH after Epoch ends and liquidity is available.
                        </DocsCard>
                        <DocsCard title="cancelWithdraw()">
                            Cancels a pending request and returns shares to user wallet.
                        </DocsCard>
                        <DocsCard title="convertToAssets(uint256 shares) view">
                            Returns the real ETH value of shares (Principal + Yield).
                        </DocsCard>
                    </div>
                </DocsSection>

                {/* Security Considerations */}
                <DocsSection icon={ShieldCheck} iconColor="#22c55e" title="Security Considerations">
                    <div className="space-y-3">
                        <DocsCard title="ReentrancyGuard" variant="success">
                            Protects all state-changing functions from reentrancy attacks.
                        </DocsCard>
                        <DocsCard title="Withdrawal Queue" variant="success">
                            Prevents "Bank Run" scenarios and ensures liquidity is managed for strategy execution.
                        </DocsCard>
                        <DocsCard title="Non-Custodial" variant="success">
                            Protocol never holds user keys. Funds accessible via smart contract logic.
                        </DocsCard>
                        <DocsCard title="Strategy Lock" variant="warning">
                            Funds are illiquid during active Epochs (Friday to Friday). Withdrawals must be scheduled.
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
