"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleDown, CircleNotch, ArrowSquareOut } from "@phosphor-icons/react";
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
    const { isPreviewMode, vaultBalanceETH, demoWithdraw, pendingWithdrawalETH, pendingWithdrawalShares, vaultExpiry } = useDashboardData();
    const [step, setStep] = useState<"input" | "processing" | "success" | "pending_view">("input");
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();

    const vault = useVaultContract({
        address,
        onSuccess: () => {
            toast.dismiss();
            setStep("success");
            toast.success("Transaction Confirmed!");
            vault.refetchBalance();
        }
    });

    useEffect(() => {
        if (pendingWithdrawalShares > 0 && step === "input") {
            setTimeout(() => setStep("pending_view"), 0);
        }
    }, [pendingWithdrawalShares, step]);

    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setTimeout(() => setAmount(urlAmount), 0);
        }
    }, [searchParams]);

    useEffect(() => {
        if (vault.isConfirmed && step === "processing") {
            setTimeout(() => {
                toast.dismiss();
                setStep("success");
                toast.success("Transaction Confirmed!");
                vault.refetchBalance();
            }, 0);
        }
    }, [vault.isConfirmed, step]);

    const totalBalance = isPreviewMode ? vaultBalanceETH : vault.userBalanceETH;
    const { numAmount, isValidAmount } = useAmountValidation(amount, totalBalance);

    const handleMax = () => {
        return parseFloat(totalBalance.toFixed(6)).toString();
    };

    const handleScheduleWithdraw = async () => {
        if (!isValidAmount || !isConnected || !address) {
            toast.error("Please connect your wallet");
            return;
        }
        setIsSubmitting(true);
        setStep("processing");
        const success = await vault.scheduleWithdraw(numAmount, vault.userShares);
        setIsSubmitting(false);
        if (!success) {
            setStep("input");
        }
    };

    const handleClaim = async () => {
        setIsSubmitting(true);
        setStep("processing");
        const success = await vault.claimWithdraw();
        setIsSubmitting(false);
        if (!success) {
            setStep("pending_view");
        }
    };

    const handleCancel = async () => {
        setIsSubmitting(true);
        setStep("processing");
        const success = await vault.cancelWithdraw();
        setIsSubmitting(false);
        if (!success) {
            setStep("pending_view");
        }
    };

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

                        {step === "pending_view" && (() => {
                            const now = new Date();
                            const canClaim = vaultExpiry ? now >= vaultExpiry : false;
                            const timeUntilClaim = vaultExpiry ? Math.max(0, vaultExpiry.getTime() - now.getTime()) : 0;
                            const hoursUntil = Math.floor(timeUntilClaim / (1000 * 60 * 60));
                            const minsUntil = Math.floor((timeUntilClaim % (1000 * 60 * 60)) / (1000 * 60));

                            return (
                                <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center border ${canClaim
                                        ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20'
                                        : 'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20'
                                        }`}>
                                        <CircleNotch size={32} weight="bold" className={canClaim ? '' : 'animate-spin-slow'} />
                                    </div>

                                    <h2 className="text-2xl font-black text-white uppercase mb-2">
                                        {canClaim ? 'Ready to Claim!' : 'Withdrawal Queued'}
                                    </h2>

                                    <p className="text-[var(--text-secondary)] mb-4">
                                        You have <strong className="text-white">{pendingWithdrawalETH.toFixed(4)} ETH</strong> scheduled for withdrawal.
                                    </p>

                                    {/* Claim Status Card */}
                                    <div className={`p-4 rounded-xl mb-6 ${canClaim
                                        ? 'bg-[var(--success)]/10 border border-[var(--success)]/30'
                                        : 'bg-white/[0.03] border border-[var(--border-subtle)]'
                                        }`}>
                                        {canClaim ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                                                <span className="text-sm font-bold text-[var(--success)]">
                                                    Epoch expired - You can claim now!
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide mb-1">
                                                    Claimable After
                                                </p>
                                                <p className="text-lg font-bold text-white">
                                                    {vaultExpiry?.toLocaleDateString('en-GB', {
                                                        weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                                                    }) || 'Next Friday 08:00 UTC'}
                                                </p>
                                                {timeUntilClaim > 0 && (
                                                    <p className="text-xs text-[var(--warning)] mt-1 font-mono">
                                                        ~{hoursUntil}h {minsUntil}m remaining
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={handleCancel}
                                            className="h-14 rounded-xl border border-[var(--border-medium)] text-[var(--text-secondary)] font-bold hover:bg-white/5 hover:text-white transition-colors"
                                        >
                                            Cancel Request
                                        </button>
                                        <button
                                            onClick={handleClaim}
                                            disabled={!canClaim}
                                            className={`h-14 rounded-xl font-bold uppercase transition-colors ${canClaim
                                                ? 'bg-[var(--volt)] text-black hover:bg-[var(--volt)]/90 shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                                                : 'bg-white/10 text-[var(--text-tertiary)] cursor-not-allowed'
                                                }`}
                                        >
                                            {canClaim ? 'Claim Funds' : 'Not Yet'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-[var(--text-tertiary)] mt-4">
                                        {canClaim
                                            ? 'Click "Claim Funds" to receive your ETH back to your wallet.'
                                            : 'Your shares continue earning yield while queued. Claim button will activate after epoch expiry.'
                                        }
                                    </p>
                                </motion.div>
                            );
                        })()}

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
                                        <p className="text-xl font-black text-white tracking-tight">
                                            {totalBalance.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                                            <span className="text-lg text-[var(--text-tertiary)] ml-1">ETH</span>
                                        </p>
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
                                    noticeText={`Funds will be added to queue and released after Epoch Expiry (${vaultExpiry
                                        ? vaultExpiry.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
                                        : "Next Friday"
                                        }).`}
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
                                        disabled={!isValidAmount || isSubmitting}
                                        className="btn-primary bg-white text-black hover:bg-white/90 disabled:bg-white/40 w-full h-16 text-base tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <CircleNotch size={18} className="animate-spin" />
                                                Scheduling...
                                            </>
                                        ) : (
                                            'Schedule Withdrawal'
                                        )}
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
                                <p className="text-[var(--text-secondary)] text-center mb-4 max-w-xs mx-auto">
                                    Your request has been processed successfully. Check stats for updates.
                                </p>
                                {vault.txHash && (
                                    <a
                                        href={`https://basescan.org/tx/${vault.txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 mb-6 transition-colors"
                                    >
                                        <ArrowSquareOut size={16} weight="bold" />
                                        View on Basescan
                                    </a>
                                )}
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
