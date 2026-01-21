"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleUp, CheckCircle, CircleNotch, Info, Warning, TrendUp, ArrowUpRight, ArrowCircleDown, ArrowsLeftRight, Wallet, ChartLineDown, ShieldWarning } from "@phosphor-icons/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import Link from "next/link";
import { PROTOCOL, YIELD, RISK, VULTARA_ETH_VAULT_ABI, DEMO_DATA } from "@/constants";
import { useWalletConnection, useDashboardData } from "@/hooks";
import { formatUnits, parseEther } from "viem";
import { TransactionFeedback } from "@/components/ui";

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

    const { isConnected, ethBalance, address, connect: handleConnect } = useWalletConnection();
    const { isPreviewMode, walletBalanceETH, ethPrice, demoDeposit } = useDashboardData();
    const chainId = useChainId();

    // Get contract addresses for current chain
    const contracts = PROTOCOL.CONTRACTS[chainId as keyof typeof PROTOCOL.CONTRACTS] || PROTOCOL.CONTRACTS[84532];

    // Contract write hook - single transaction for ETH deposit
    const { writeContract: writeDeposit, data: depositHash, isPending: isDepositing } = useWriteContract();

    // Transaction receipt hook
    const { isLoading: isDepositConfirming, isSuccess: isDepositSuccess } = useWaitForTransactionReceipt({ hash: depositHash });

    const searchParams = useSearchParams();
    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setAmount(urlAmount);
        }
    }, [searchParams]);

    // Handle deposit success
    useEffect(() => {
        if (isDepositSuccess && step === "processing") {
            toast.dismiss();
            setStep("success");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#CCFF00", "#ffffff", "#22c55e"],
            });
            toast.success("Deposit Successful!");
        }
    }, [isDepositSuccess]);

    // ETH Balance as wallet balance - use demo data in preview mode
    const realWalletBalance = ethBalance ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)) : 0;
    const walletBalance = isPreviewMode ? walletBalanceETH : realWalletBalance;

    // Reserve some ETH for gas (0.005 ETH should be enough)
    const gasReserve = 0.005;
    const maxDepositable = Math.max(0, walletBalance - gasReserve);

    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;

    // Add epsilon tolerance for floating point comparison (fixes 0.1 vs 0.0999... issues)
    const epsilon = 0.0001;
    const isOverBalance = numAmount > walletBalance + epsilon;
    const isOverMaxDepositable = numAmount > maxDepositable + epsilon;
    const isValidAmount = numAmount >= 0.001 && !isOverMaxDepositable;
    const needsGasWarning = isOverMaxDepositable && !isOverBalance;
    const monthlyYield = YIELD.calculateMonthly(numAmount * ethPrice); // Use live or demo ETH price for yield calc
    const depositValueUSD = numAmount * ethPrice;

    const handleContinue = () => {
        if (!isValidAmount) return;
        setStep("confirm");
    };

    // Simulated deposit for preview/demo mode
    const handlePreviewDeposit = () => {
        if (!riskAcknowledged) {
            toast.error("Please acknowledge the risks first");
            return;
        }
        setStep("processing");
        toast.loading("Simulating deposit...");
        // Simulate transaction delay
        setTimeout(() => {
            // Persist to demo store
            demoDeposit(numAmount);

            toast.dismiss();
            setStep("success");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#CCFF00", "#ffffff", "#22c55e"],
            });
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

        try {
            const depositAmountWei = parseEther(numAmount.toString());

            // Single transaction - deposit ETH directly
            toast.loading("Depositing ETH to Vault...");
            writeDeposit({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "deposit",
                value: depositAmountWei,
            });
        } catch (error) {
            toast.dismiss();
            toast.error("Transaction failed");
            setStep("confirm");
        }
    };

    const handleMax = () => {
        // Leave some ETH for gas
        const maxAmount = Math.max(0, walletBalance - 0.005);
        setAmount(maxAmount.toFixed(4));
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative group"
            >
                {/* Glow Effect */}
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
                                        <p className="text-[8px] text-[var(--text-tertiary)] italic">*Variable</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3 px-2">
                                        <span className="label text-[var(--text-secondary)]">Amount (ETH)</span>
                                        <span className="text-xs font-mono text-[var(--text-tertiary)] hover:text-white cursor-pointer transition-colors" onClick={handleMax}>
                                            Bal: {walletBalance.toFixed(4)} ETH
                                        </span>
                                    </div>

                                    <div className="relative group/input">
                                        <div className="absolute inset-0 bg-[var(--volt)]/20 blur-xl rounded-2xl opacity-0 group-focus-within/input:opacity-50 transition-opacity" />
                                        <motion.div
                                            animate={isOverBalance ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                            transition={{ duration: 0.4 }}
                                            className={`relative flex items-center gap-3 p-5 sm:p-6 rounded-2xl bg-[var(--obsidian-base)] border transition-colors ${isOverBalance
                                                ? "border-[var(--error)] bg-[var(--error)]/5"
                                                : "border-[var(--border-medium)] group-focus-within/input:border-[var(--volt)]"
                                                }`}
                                        >
                                            <span className={`text-2xl sm:text-3xl ${isOverBalance ? "text-[var(--error)]" : "text-[var(--text-tertiary)]"}`}>Ξ</span>
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                value={amount}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val)) || val === '') {
                                                        const formatted = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                        setAmount(formatted);
                                                    }
                                                }}
                                                placeholder="0"
                                                className={`w-full bg-transparent text-3xl sm:text-4xl font-black placeholder:text-white/10 outline-none focus-visible:ring-0 ${isOverBalance ? "text-[var(--error)]" : "text-white"
                                                    }`}
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => setAmount(maxDepositable.toFixed(4))}
                                                className={`min-h-[44px] min-w-[60px] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isOverBalance
                                                    ? "bg-[var(--error)]/10 text-[var(--error)] hover:bg-[var(--error)] hover:text-white focus-visible:outline-[var(--error)]"
                                                    : "bg-[var(--volt)]/10 text-[var(--volt)] hover:bg-[var(--volt)] hover:text-black focus-visible:outline-[var(--volt)]"
                                                    }`}
                                            >
                                                Max
                                            </button>
                                        </motion.div>
                                    </div>

                                    {/* Validation States */}
                                    {isOverBalance ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 flex items-center gap-2 px-2 text-[var(--error)]"
                                        >
                                            <Warning size={16} weight="bold" />
                                            <span className="text-sm font-bold">Insufficient ETH balance</span>
                                        </motion.div>
                                    ) : needsGasWarning ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 flex items-center gap-2 px-2 text-[var(--warning)]"
                                        >
                                            <Warning size={16} weight="bold" />
                                            <span className="text-sm font-bold">Leave ~0.005 ETH for gas. Max: {maxDepositable.toFixed(4)} ETH</span>
                                        </motion.div>
                                    ) : numAmount >= 0.001 ? (
                                        <div className="mt-4 px-2 space-y-1">
                                            <div className="flex items-center gap-2 text-[var(--volt)]">
                                                <TrendUp size={16} weight="bold" />
                                                <span className="text-sm font-bold">Est. yield: ~${monthlyYield.toFixed(2)} / month</span>
                                            </div>
                                            {numAmount >= maxDepositable - 0.001 && (
                                                <p className="text-[10px] text-[var(--text-tertiary)] italic pl-6">
                                                    * 0.005 ETH reserved for gas fees
                                                </p>
                                            )}
                                        </div>
                                    ) : null}

                                    {/* Low Balance Helper - ETH Faucet */}
                                    {walletBalance < 0.01 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-6"
                                        >
                                            <a
                                                href="https://www.alchemy.com/faucets/base-sepolia"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 rounded-xl bg-[var(--volt)]/10 border border-[var(--volt)]/40 hover:bg-[var(--volt)]/20 transition-all group/faucet cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-lg bg-[var(--volt)]/10 flex items-center justify-center text-[var(--volt)]">
                                                        <ArrowCircleDown size={18} weight="duotone" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-white uppercase tracking-wide">Get Free ETH</p>
                                                        <p className="text-[10px] text-[var(--text-secondary)]">Base Sepolia Faucet</p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight size={14} weight="bold" className="text-[var(--volt)] group-hover/faucet:translate-x-0.5 group-hover/faucet:-translate-y-0.5 transition-transform" />
                                            </a>
                                        </motion.div>
                                    )}

                                    {/* Risk Indicator Card - Balanced: Premium + Informative */}
                                    {numAmount >= 0.001 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-6 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.1]"
                                        >
                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <ShieldWarning size={16} weight="duotone" className="text-[var(--text-secondary)]" />
                                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Risk Profile</span>
                                                </div>
                                            </div>

                                            {/* Yield Expectation */}
                                            <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--volt)]/5 border border-[var(--volt)]/20 mb-4">
                                                <span className="text-xs text-[var(--text-secondary)]">Expected Yield</span>
                                                <span className="text-sm font-bold text-[var(--volt)]">+${(depositValueUSD * 0.03 / 12).toFixed(0)} to +${(depositValueUSD * 0.08 / 12).toFixed(0)} / month</span>
                                            </div>

                                            {/* Downside Scenarios - Informative Vertical Layout */}
                                            <div className="space-y-2">
                                                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">If ETH Price Drops:</p>
                                                {RISK.DOWNSIDE_SCENARIOS.map((scenario) => {
                                                    const potentialLoss = RISK.calculateDownsideLoss(depositValueUSD, scenario.dropPercent);
                                                    const isNoLoss = scenario.lossPercent === 0;
                                                    return (
                                                        <div
                                                            key={scenario.dropPercent}
                                                            className={`flex items-center justify-between p-2.5 rounded-lg border ${isNoLoss
                                                                ? 'bg-[var(--success)]/5 border-[var(--success)]/20'
                                                                : 'bg-white/[0.02] border-white/[0.06]'
                                                                }`}
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

                                            {/* Subtle Disclaimer */}
                                            <p className="mt-3 text-[9px] text-[var(--text-tertiary)] italic">
                                                Yields are variable and not guaranteed. Past performance ≠ future results.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>

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
                                </div>

                                {/* Risk Disclosure - Matching Glassmorphism Style */}
                                <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] mb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Info size={14} weight="bold" className="text-[var(--text-tertiary)]" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Risk Summary</span>
                                        </div>
                                    </div>

                                    {/* Worst Case Scenario Highlight */}
                                    <div className="p-3 rounded-xl bg-[var(--error)]/5 border border-[var(--error)]/20 mb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <ChartLineDown size={14} className="text-[var(--error)]" />
                                                <span className="text-xs text-[var(--text-secondary)]">Worst case (-30% ETH)</span>
                                            </div>
                                            <span className="text-sm font-bold text-[var(--error)]">-${RISK.calculateDownsideLoss(depositValueUSD, 30).toFixed(0)}</span>
                                        </div>
                                    </div>

                                    {/* Compact Disclaimers */}
                                    <div className="space-y-1.5">
                                        {RISK.DISCLAIMERS.slice(0, 2).map((disclaimer, idx) => (
                                            <p key={idx} className="text-[10px] text-[var(--text-tertiary)] flex items-start gap-1.5">
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
                                    <button
                                        onClick={() => setStep("input")}
                                        className="btn-secondary h-12 sm:h-14 text-xs active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                                    >
                                        Cancel
                                    </button>
                                    {isPreviewMode ? (
                                        <button
                                            onClick={handlePreviewDeposit}
                                            disabled={!riskAcknowledged}
                                            className="btn-primary h-12 sm:h-14 text-xs disabled:opacity-40 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2"
                                        >
                                            Confirm (Demo)
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleDeposit}
                                            disabled={!riskAcknowledged}
                                            className="btn-primary h-12 sm:h-14 text-xs disabled:opacity-40 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2"
                                        >
                                            Confirm
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === "processing" && (
                            <motion.div key="processing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-[var(--volt)]/20 blur-xl rounded-full" />
                                    <CircleNotch size={64} className="text-[var(--volt)] animate-spin relative z-10" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Processing</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Please confirm in your wallet...</p>
                            </motion.div>
                        )}

                        {step === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8">
                                <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center mb-6">
                                    <CheckCircle size={40} weight="fill" className="text-[var(--success)]" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Complete</h3>
                                <p className="text-[var(--text-secondary)] text-center mb-8 max-w-xs mx-auto">
                                    Your funds have been deposited successfully into the Vault.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="btn-secondary h-14 px-8 w-full flex items-center justify-center text-xs"
                                >
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
