"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleUp, CheckCircle, CircleNotch, Info, Warning, TrendUp, ArrowUpRight, ArrowCircleDown, ArrowsLeftRight } from "@phosphor-icons/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useChainId, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import Link from "next/link";
import { PROTOCOL, YIELD, VULTARA_ETH_VAULT_ABI } from "@/constants";
import { useWalletConnection } from "@/hooks";
import { formatUnits, parseEther } from "viem";

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

    // ETH Balance as wallet balance
    const walletBalance = ethBalance ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)) : 0;

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
    const monthlyYield = YIELD.calculateMonthly(numAmount * 2500); // Approximate ETH to USD for yield calc

    const handleContinue = () => {
        if (!isValidAmount) return;
        setStep("confirm");
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
                                            <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-none mb-1">Deposit</h1>
                                            <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Add Liquidity</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">APY Rate</p>
                                        <p className="text-xl font-black text-[var(--volt)] tracking-tight">{PROTOCOL.APY}%</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3 px-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Amount (ETH)</span>
                                        <span className="text-xs font-mono text-[var(--text-tertiary)] hover:text-white cursor-pointer" onClick={handleMax}>
                                            Bal: {walletBalance.toFixed(4)} ETH
                                        </span>
                                    </div>

                                    <div className="relative group/input">
                                        <div className="absolute inset-0 bg-[var(--volt)]/20 blur-xl rounded-2xl opacity-0 group-focus-within/input:opacity-50 transition-opacity" />
                                        <motion.div
                                            animate={isOverBalance ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                            transition={{ duration: 0.4 }}
                                            className={`relative flex items-center gap-2 p-6 rounded-2xl bg-[var(--obsidian-base)] border transition-colors ${isOverBalance
                                                ? "border-[var(--error)] bg-[var(--error)]/5"
                                                : "border-[var(--border-medium)] group-focus-within/input:border-[var(--volt)]"
                                                }`}
                                        >
                                            <span className={`text-3xl ${isOverBalance ? "text-[var(--error)]" : "text-[var(--text-tertiary)]"}`}>Ξ</span>
                                            <input
                                                type="text"
                                                value={amount}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val)) || val === '') {
                                                        const formatted = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                        setAmount(formatted);
                                                    }
                                                }}
                                                placeholder="0"
                                                className={`w-full bg-transparent text-4xl font-black placeholder:text-white/10 outline-none ${isOverBalance ? "text-[var(--error)]" : "text-white"
                                                    }`}
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => setAmount(maxDepositable.toFixed(4))}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider ${isOverBalance
                                                    ? "bg-[var(--error)]/10 text-[var(--error)] hover:bg-[var(--error)] hover:text-white"
                                                    : "bg-[var(--volt)]/10 text-[var(--volt)] hover:bg-[var(--volt)] hover:text-black"
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
                                        <div className="mt-4 flex items-center gap-2 px-2 text-[var(--volt)]">
                                            <TrendUp size={16} weight="bold" />
                                            <span className="text-sm font-bold">Est. yield: ~${monthlyYield.toFixed(2)} / month</span>
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
                                </div>

                                <button
                                    onClick={handleContinue}
                                    disabled={!isValidAmount}
                                    className="w-full h-16 rounded-2xl bg-[var(--volt)] text-black font-black text-base uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(204,255,0,0.15)]"
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

                                <label className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-subtle)] cursor-pointer mb-6 hover:bg-white/[0.02] transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={riskAcknowledged}
                                        onChange={(e) => setRiskAcknowledged(e.target.checked)}
                                        className="mt-1 w-4 h-4 rounded border-gray-600 bg-transparent text-[var(--volt)] focus:ring-[var(--volt)]"
                                    />
                                    <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        I verify that I am depositing funds into the Smart Contract Vault and understand the associated risks.
                                    </span>
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setStep("input")}
                                        className="h-14 rounded-2xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-xs"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeposit}
                                        disabled={!riskAcknowledged}
                                        className="h-14 rounded-2xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-40 text-xs"
                                    >
                                        Confirm
                                    </button>
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
                                    className="h-14 px-8 rounded-2xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center text-xs"
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
