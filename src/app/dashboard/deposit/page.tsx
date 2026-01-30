"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleUp, CheckCircle, CircleNotch, Info, TrendUp, ChartLineDown, ShieldWarning } from "@phosphor-icons/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { PROTOCOL, YIELD, RISK } from "@/constants";
import { useWalletConnection, useDashboardData, useVaultContract } from "@/hooks";
import { formatUnits } from "viem";
import { AmountInput, useAmountValidation, SuccessAnimation, ProcessingState } from "@/components/ui";

function DepositLoading() {
    return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
            <CircleNotch size={32} className="animate-spin text-[var(--volt)]" />
        </div>
    );
}

export default function DepositPage() {
    return (
        <Suspense fallback={<DepositLoading />}>
            <DepositContent />
        </Suspense>
    );
}

function DepositContent() {
    const [step, setStep] = useState<"input" | "confirm" | "processing" | "success">("input");
    const [amount, setAmount] = useState("");
    const [riskAcknowledged, setRiskAcknowledged] = useState(false);

    const { isConnected, ethBalance, address } = useWalletConnection();
    const { isPreviewMode, walletBalanceETH, ethPrice, demoDeposit, vaultExpiry } = useDashboardData();

    const vault = useVaultContract({ address });
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setAmount(urlAmount);
        }
    }, [searchParams]);

    useEffect(() => {
        if (vault.isConfirmed && step === "processing") {
            toast.dismiss();
            setStep("success");
            toast.success("Deposit Successful!");
        }
    }, [vault.isConfirmed, step]);

    const realWalletBalance = ethBalance ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)) : 0;
    const walletBalance = isPreviewMode ? walletBalanceETH : realWalletBalance;
    const gasReserve = 0.005;

    const { numAmount, isValidAmount, maxDepositable } = useAmountValidation(amount, walletBalance, gasReserve);
    const monthlyYield = YIELD.calculateMonthly(numAmount * ethPrice);
    const depositValueUSD = numAmount * ethPrice;

    const handleContinue = () => {
        if (!isValidAmount) return;
        setStep("confirm");
    };

    const handlePreviewDeposit = () => {
        if (!riskAcknowledged) {
            toast.error("Please acknowledge the risks first");
            return;
        }
        setStep("processing");
        toast.loading("Simulating deposit...");
        setTimeout(() => {
            demoDeposit(numAmount);
            toast.dismiss();
            setStep("success");
            toast.success("Demo Deposit Successful!");
        }, 2000);
    };

    const handleDeposit = async () => {
        if (!riskAcknowledged) {
            toast.error("Please acknowledge the risks first");
            return;
        }
        if (!isConnected || !address) {
            toast.error("Please connect your wallet");
            return;
        }
        setStep("processing");
        const success = await vault.deposit(numAmount);
        if (!success) {
            setStep("confirm");
        }
    };

    const handleMax = () => {
        return parseFloat(maxDepositable.toFixed(6)).toString();
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative group"
            >
                <div className="absolute inset-0 bg-[var(--volt)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-[2.5rem] bg-[var(--obsidian-surface)] border border-[var(--border-medium)] p-8 sm:p-12 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {step === "input" && (
                            <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-[var(--volt)]/10 flex items-center justify-center text-[var(--volt)] border border-[var(--volt)]/20">
                                            <ArrowCircleUp size={24} weight="duotone" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-1">Deposit</h1>
                                            <p className="label text-[var(--text-secondary)]">Add Liquidity</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="label text-[var(--text-secondary)] mb-0.5">Est. APY</p>
                                        <p className="text-xl font-black text-[var(--volt)] tracking-tight">~{PROTOCOL.APY}%</p>
                                        <p className="text-xs text-[var(--text-tertiary)] italic">*Variable</p>
                                    </div>
                                </div>

                                <AmountInput
                                    value={amount}
                                    onChange={setAmount}
                                    maxAmount={maxDepositable}
                                    balance={walletBalance}
                                    onMax={handleMax}
                                    label="Amount (ETH)"
                                    balanceLabel="Bal"
                                    accentColor="volt"
                                    showYieldPreview={true}
                                    monthlyYield={monthlyYield}
                                />

                                {walletBalance < 0.01 && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6">
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--warning)]/10 border border-[var(--warning)]/40">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-[var(--warning)]/10 flex items-center justify-center text-[var(--warning)]">
                                                    <Info size={18} weight="duotone" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white uppercase tracking-wide">Low Balance</p>
                                                    <p className="text-[11px] text-[var(--text-secondary)]">Bridge ETH to Base via Coinbase or any bridge</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {numAmount >= 0.001 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.1]">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <ShieldWarning size={16} weight="duotone" className="text-[var(--text-secondary)]" />
                                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Risk Profile</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--volt)]/5 border border-[var(--volt)]/20 mb-4">
                                            <span className="text-xs text-[var(--text-secondary)]">Expected Yield</span>
                                            <span className="text-sm font-bold text-[var(--volt)]">+${(depositValueUSD * 0.03 / 12).toFixed(0)} to +${(depositValueUSD * 0.08 / 12).toFixed(0)} / month</span>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[11px] text-[var(--text-tertiary)] uppercase tracking-wide">If ETH Price Drops:</p>
                                            {RISK.DOWNSIDE_SCENARIOS.map((scenario) => {
                                                const potentialLoss = RISK.calculateDownsideLoss(depositValueUSD, scenario.dropPercent);
                                                const isNoLoss = scenario.lossPercent === 0;
                                                return (
                                                    <div
                                                        key={scenario.dropPercent}
                                                        className={`flex items-center justify-between p-2.5 rounded-lg border ${isNoLoss ? 'bg-[var(--success)]/5 border-[var(--success)]/20' : 'bg-white/[0.02] border-white/[0.06]'}`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <ChartLineDown size={14} className={isNoLoss ? 'text-[var(--success)]' : 'text-[var(--error)]'} />
                                                            <div>
                                                                <span className="text-xs font-bold text-white">{scenario.label}</span>
                                                                <span className="text-xs text-[var(--text-tertiary)] ml-1.5">(-{scenario.dropPercent}%)</span>
                                                            </div>
                                                        </div>
                                                        <span className={`text-xs font-bold ${isNoLoss ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                                                            {isNoLoss ? '✓ No loss' : `-$${potentialLoss.toFixed(0)}`}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <p className="mt-3 text-xs text-[var(--text-secondary)]">
                                            Yields are variable and not guaranteed. Past performance ≠ future results.
                                        </p>
                                    </motion.div>
                                )}

                                <button
                                    onClick={handleContinue}
                                    disabled={!isValidAmount}
                                    className="btn-primary w-full h-14 sm:h-16 text-sm sm:text-base tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.15)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2"
                                >
                                    Continue
                                </button>
                            </motion.div>
                        )}

                        {step === "confirm" && (
                            <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Confirm Deposit</h2>
                                    <p className="text-[var(--text-secondary)] text-sm">Review your transaction details</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-[var(--obsidian-base)] border border-[var(--border-medium)] mb-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[var(--text-secondary)] font-medium">Amount</span>
                                        <span className="text-xl font-black text-white">${numAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full h-px bg-[var(--border-subtle)]" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[var(--text-secondary)] font-medium">Network</span>
                                        <span className="text-sm font-bold text-blue-400">Base</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-[var(--text-secondary)] font-medium">Strategy</span>
                                        <span className="text-sm font-bold text-[var(--volt)]">Thetanuts V4</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm text-[var(--text-secondary)] font-medium">Withdrawal</span>
                                            <div className="group/tooltip relative">
                                                <Info size={12} className="text-[var(--text-tertiary)] cursor-help" />
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-lg bg-[var(--obsidian-base)] border border-[var(--border-subtle)] w-48 text-[10px] text-[var(--text-secondary)] leading-relaxed opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                                                    Funds are locked in active strategies until the epoch expires.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-[var(--warning)] block">Epoch Expiry</span>
                                            <span className="text-[10px] text-[var(--text-tertiary)] font-mono">
                                                {vaultExpiry
                                                    ? vaultExpiry.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                                                    : "Next Friday 08:00 UTC"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] mb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Info size={14} weight="bold" className="text-[var(--text-tertiary)]" />
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Risk Summary</span>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-[var(--error)]/5 border border-[var(--error)]/20 mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <ChartLineDown size={14} className="text-[var(--error)]" />
                                                <span className="text-xs text-[var(--text-secondary)]">Worst case (-30% ETH)</span>
                                            </div>
                                            <span className="text-sm font-bold text-[var(--error)]">-${RISK.calculateDownsideLoss(depositValueUSD, 30).toFixed(0)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        {RISK.DISCLAIMERS.slice(0, 2).map((disclaimer, idx) => (
                                            <p key={idx} className="text-xs text-[var(--text-tertiary)] flex items-start gap-1.5">
                                                <span className="text-[var(--text-tertiary)]">•</span>
                                                <span>{disclaimer}</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <label className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-subtle)] cursor-pointer mb-6 hover:bg-white/[0.02] transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={riskAcknowledged}
                                        onChange={(e) => setRiskAcknowledged(e.target.checked)}
                                        className="mt-1 w-4 h-4 rounded border-gray-600 bg-transparent text-[var(--volt)] focus:ring-[var(--volt)]"
                                    />
                                    <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        I understand that yields are variable, not guaranteed, and I accept the risks of depositing into this vault.
                                    </span>
                                </label>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <button onClick={() => setStep("input")} className="btn-secondary h-12 sm:h-14 text-xs active:scale-[0.98]">
                                        Cancel
                                    </button>
                                    {isPreviewMode ? (
                                        <button onClick={handlePreviewDeposit} disabled={!riskAcknowledged} className="btn-primary h-12 sm:h-14 text-xs disabled:opacity-40 active:scale-[0.98]">
                                            Confirm (Demo)
                                        </button>
                                    ) : (
                                        <button onClick={handleDeposit} disabled={!riskAcknowledged} className="btn-primary h-12 sm:h-14 text-xs disabled:opacity-40 active:scale-[0.98]">
                                            Confirm
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === "processing" && (
                            <ProcessingState color="volt" />
                        )}

                        {step === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8">
                                <SuccessAnimation />
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Complete</h3>
                                <p className="text-[var(--text-secondary)] text-center mb-8 max-w-xs mx-auto">
                                    Your funds have been deposited successfully into the Vault.
                                </p>
                                <Link href="/dashboard" className="btn-primary w-full h-14 px-8 flex items-center justify-center text-xs tracking-widest font-bold uppercase shadow-[0_0_20px_rgba(204,255,0,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all">
                                    Return to Dashboard
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
