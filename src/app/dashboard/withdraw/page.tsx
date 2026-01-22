"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleDown, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useWalletConnection, useDashboardData, useVaultContract } from "@/hooks";
import { AmountInput, useAmountValidation, SuccessAnimation, ProcessingState } from "@/components/ui";

function WithdrawLoading() {
    return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
            <CircleNotch size={32} className="animate-spin text-blue-400" />
        </div>
    );
}

export default function WithdrawPage() {
    return (
        <Suspense fallback={<WithdrawLoading />}>
            <WithdrawContent />
        </Suspense>
    );
}

function WithdrawContent() {
    const { isConnected, address } = useWalletConnection();
    const { isPreviewMode, vaultBalanceETH, demoWithdraw, pendingWithdrawalETH, pendingWithdrawalShares } = useDashboardData();
    const [step, setStep] = useState<"input" | "processing" | "success" | "pending_view">("input");
    const [amount, setAmount] = useState("");
    const searchParams = useSearchParams();

    // Use centralized vault contract hook
    const vault = useVaultContract({
        address,
        onSuccess: () => {
            toast.dismiss();
            setStep("success");
            toast.success("Transaction Confirmed!");
            vault.refetchBalance();
        }
    });

    // Check for existing pending withdrawal on mount
    useEffect(() => {
        if (pendingWithdrawalShares > 0 && step === "input") {
            setStep("pending_view");
        }
    }, [pendingWithdrawalShares, step]);

    // URL amount param
    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setAmount(urlAmount);
        }
    }, [searchParams]);

    // Handle transaction success
    useEffect(() => {
        if (vault.isConfirmed && step === "processing") {
            toast.dismiss();
            setStep("success");
            toast.success("Transaction Confirmed!");
            vault.refetchBalance();
        }
    }, [vault.isConfirmed, step]);

    // Get balance based on mode
    const totalBalance = isPreviewMode ? vaultBalanceETH : vault.userBalanceETH;
    const { numAmount, isValidAmount } = useAmountValidation(amount, totalBalance);

    const handleMax = () => setAmount(totalBalance.toFixed(6));

    // === ACTIONS ===

    const handleScheduleWithdraw = async () => {
        if (!isValidAmount || !isConnected || !address) {
            toast.error("Please connect your wallet");
            return;
        }
        setStep("processing");
        await vault.scheduleWithdraw(numAmount, vault.userShares);
    };

    const handleClaim = async () => {
        setStep("processing");
        await vault.claimWithdraw();
    };

    const handleCancel = async () => {
        setStep("processing");
        await vault.cancelWithdraw();
    };

    // Simulated withdraw for preview/demo mode
    const handlePreviewWithdraw = () => {
        if (!isValidAmount) return;
        setStep("processing");
        toast.loading("Simulating withdrawal...");
        setTimeout(() => {
            demoWithdraw(numAmount);
            toast.dismiss();
            setStep("success");
            toast.success("Demo Withdrawal Complete!");
        }, 2000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative group"
            >
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-[2.5rem] bg-[var(--obsidian-surface)] border border-[var(--border-medium)] p-8 sm:p-12 overflow-hidden">
                    <AnimatePresence mode="wait">

                        {step === "pending_view" && (
                            <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--warning)]/10 text-[var(--warning)] mx-auto mb-6 flex items-center justify-center border border-[var(--warning)]/20">
                                    <CircleNotch size={32} weight="bold" className="animate-spin-slow" />
                                </div>
                                <h2 className="text-2xl font-black text-white uppercase mb-2">Withdrawal Queued</h2>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    You have <strong className="text-white">{pendingWithdrawalETH.toFixed(4)} ETH</strong> scheduled for withdrawal.
                                    Funds are released every Friday.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleCancel}
                                        className="h-14 rounded-xl border border-[var(--border-medium)] text-[var(--text-secondary)] font-bold hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        Cancel Request
                                    </button>
                                    <button
                                        onClick={handleClaim}
                                        className="h-14 rounded-xl bg-[var(--volt)] text-black font-bold uppercase hover:bg-[var(--volt)]/90 transition-colors shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                                    >
                                        Claim Funds
                                    </button>
                                </div>
                                <p className="text-xs text-[var(--text-tertiary)] mt-4">
                                    Note: Claiming will fail if funds are currently locked in strategy.
                                </p>
                            </motion.div>
                        )}

                        {step === "input" && (
                            <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                            <ArrowCircleDown size={24} weight="duotone" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-1">Schedule</h1>
                                            <p className="label text-[var(--text-secondary)]">Request Exit Queue</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="label text-[var(--text-secondary)] mb-1">Available to Withdraw</p>
                                        <p className="text-xl font-black text-white tracking-tight">{totalBalance.toFixed(4)} ETH</p>
                                    </div>
                                </div>

                                <AmountInput
                                    value={amount}
                                    onChange={setAmount}
                                    maxAmount={totalBalance}
                                    balance={totalBalance}
                                    onMax={handleMax}
                                    label="Amount (ETH)"
                                    balanceLabel="Max"
                                    accentColor="blue"
                                    emptyStateLink="/dashboard/deposit"
                                    emptyStateText="No funds in vault. Deposit first →"
                                    noticeText="Funds will be added to queue and released next Friday."
                                />

                                {isPreviewMode ? (
                                    <button
                                        onClick={handlePreviewWithdraw}
                                        disabled={!isValidAmount}
                                        className="btn-primary bg-white text-black hover:bg-white/90 disabled:bg-white/40 w-full h-16 text-base tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                    >
                                        Withdraw (Demo)
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleScheduleWithdraw}
                                        disabled={!isValidAmount}
                                        className="btn-primary bg-white text-black hover:bg-white/90 disabled:bg-white/40 w-full h-16 text-base tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                    >
                                        Schedule Withdrawal
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {step === "processing" && (
                            <ProcessingState
                                color="blue"
                                description="Interacting with Vultara Vault..."
                            />
                        )}

                        {step === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8">
                                <SuccessAnimation />
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Request Confirmed</h3>
                                <p className="text-[var(--text-secondary)] text-center mb-8 max-w-xs mx-auto">
                                    Your request has been processed successfully. Check stats for updates.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="btn-primary w-full h-14 px-8 flex items-center justify-center text-xs tracking-widest font-bold uppercase shadow-[0_0_20px_rgba(204,255,0,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all"
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
