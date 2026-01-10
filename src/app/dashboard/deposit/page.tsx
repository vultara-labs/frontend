"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import {
    ArrowLeft,
    CheckCircle,
    Wallet,
    Info,
    CircleNotch,
    CaretRight,
    ArrowCircleUp,
    ShieldCheck,
    TrendUp,
    LockKey
} from "@phosphor-icons/react";

import { useSignMessage, useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";

export default function DepositPage() {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [riskAcknowledged, setRiskAcknowledged] = useState(false);

    // Wagmi Hooks for "Ghost Protocol" Realism
    const { signMessageAsync } = useSignMessage();
    const { isConnected } = useAccount();

    // Read amount from URL query param (from Nova AI action)
    const searchParams = useSearchParams();
    useEffect(() => {
        const urlAmount = searchParams.get('amount');
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setAmount(urlAmount);
        }
    }, [searchParams]);

    const walletBalance = 5420.00; // Mock USDC balance in wallet
    const currentAPY = 4.5;

    // Safer calculation for display (avoid NaN)
    const numericAmount = amount ? parseFloat(amount) : 0;
    const estimatedMonthlyYield = (numericAmount * (currentAPY / 100) / 12);
    const estimatedYearlyYield = (numericAmount * (currentAPY / 100));

    const handleApprove = async () => {
        setIsProcessing(true);
        try {
            if (isConnected) {
                // Trigger real wallet popup
                toast.loading("Please sign the approval in your wallet...");
                await signMessageAsync({
                    message: `Approve Vultara Vault to spend ${numericAmount} USDC.\n\nNonce: ${Date.now()}`
                });
                toast.dismiss();
            } else {
                // Fallback simulation
                await new Promise(r => setTimeout(r, 2000));
            }

            setStep(3);
            toast.success("USDC Approved!", {
                description: "You have authorized the Vault to spend your USDC.",
            });
        } catch (error) {
            toast.error("Approval Rejected", { description: "User denied transaction signature." });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeposit = async () => {
        setIsProcessing(true);
        try {
            if (isConnected) {
                // Trigger real wallet popup
                toast.loading("Waiting for confirmation...");
                await signMessageAsync({
                    message: `Confirm Deposit to Vultara Vault: ${numericAmount} USDC\nStrategy: Thetanuts V4 CSP\n\nNonce: ${Date.now()}`
                });
                toast.dismiss();
            } else {
                // Fallback simulation
                await new Promise(r => setTimeout(r, 2000));
            }

            setStep(4);
            toast.success("Deposit successful!", {
                description: `$${numericAmount.toLocaleString()} USDC is now earning 4.5% APY`,
            });
            // Celebration confetti!
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#CCFF00', '#10B981', '#FFFFFF']
            });
        } catch (error) {
            toast.error("Deposit Failed", { description: "Transaction signature rejected." });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto min-h-full flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors mb-4 lg:mb-6 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Back to Dashboard</span>
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-[var(--volt)]/10 text-[var(--volt)]">
                        <ArrowCircleUp size={20} weight="duotone" className="lg:w-6 lg:h-6" />
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white">
                        Deposit USDC
                    </h1>
                </div>
                <p className="text-[var(--text-secondary)] ml-10 lg:ml-12 text-sm lg:text-base">
                    Start earning {currentAPY}% organic yield on your USDC.
                </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 sm:gap-4 mb-8 lg:mb-12 ml-1 overflow-x-auto">
                {[
                    { num: 1, label: "Amount" },
                    { num: 2, label: "Approve" },
                    { num: 3, label: "Confirm" },
                    { num: 4, label: "Success" }
                ].map((s, i) => (
                    <div key={s.num} className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${step >= s.num
                            ? "bg-[var(--volt)] text-black shadow-[0_0_15px_var(--volt-glow)]"
                            : "bg-white/[0.05] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                            }`}>
                            {step > s.num ? <CheckCircle size={14} weight="fill" /> : s.num}
                        </div>
                        <span className={`text-xs sm:text-sm tracking-wide font-bold whitespace-nowrap ${step >= s.num ? "text-white" : "text-[var(--text-muted)]"}`}>
                            {s.label}
                        </span>
                        {i < 3 && <div className={`w-6 sm:w-8 h-px transition-colors duration-300 ${step > s.num ? "bg-[var(--volt)]" : "bg-[var(--border-subtle)]"}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Input */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-[var(--border-medium)] hover:border-[var(--border-bright)] transition-colors focus-within:border-[var(--volt)]/50 focus-within:bg-[var(--volt)]/[0.02]">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                                Deposit Amount (USDC)
                            </label>
                            <span className="text-xs text-[var(--text-secondary)]">
                                Wallet: <span className="text-white font-mono">${walletBalance.toLocaleString()}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl text-[#A1A1AA]">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-transparent text-4xl font-mono font-bold text-white placeholder:text-white/10 outline-none"
                                autoFocus
                            />
                            <button
                                onClick={() => setAmount(walletBalance.toString())}
                                className="px-3 py-1.5 rounded-lg bg-[var(--volt)]/10 text-[var(--volt)] text-xs font-bold hover:bg-[var(--volt)]/20 transition-colors uppercase tracking-wider"
                            >
                                Max
                            </button>
                        </div>
                    </div>

                    {/* Yield Preview */}
                    <div className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-[var(--border-subtle)]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Estimated Yield</span>
                            <div className="flex items-center gap-1.5 text-[var(--success)]">
                                <TrendUp size={14} weight="bold" />
                                <span className="text-xs font-bold">{currentAPY}% APY</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] sm:text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-bold mb-1">Monthly</p>
                                <p className="text-lg sm:text-xl font-mono font-bold text-white">
                                    +${estimatedMonthlyYield.toFixed(2)}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-[var(--text-tertiary)] uppercase tracking-widest font-bold mb-1">Yearly</p>
                                <p className="text-lg sm:text-xl font-mono font-bold text-[var(--volt)]">
                                    +${estimatedYearlyYield.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Strategy Info */}
                    <div className="p-3 lg:p-4 rounded-xl bg-[var(--info)]/5 border border-[var(--info)]/10 flex gap-3">
                        <Info size={18} weight="duotone" className="text-[var(--info)] shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--info)]/80 leading-relaxed">
                            Your USDC will be deployed to Thetanuts V3 Cash-Secured Put strategy on Base Network. Yield is generated from options premiums, not token emissions.
                        </p>
                    </div>

                    {/* Risk Acknowledgment Checkbox */}
                    <label className="flex items-start gap-3 p-4 rounded-xl bg-[var(--warning)]/5 border border-[var(--warning)]/10 cursor-pointer group hover:bg-[var(--warning)]/[0.08] transition-colors">
                        <input
                            type="checkbox"
                            checked={riskAcknowledged}
                            onChange={(e) => setRiskAcknowledged(e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[var(--volt)] cursor-pointer"
                        />
                        <span className="text-xs text-[var(--warning)]/80 leading-relaxed">
                            I understand that this vault uses an <strong className="text-[var(--warning)]">options-based strategy</strong>.
                            If the underlying asset (ETH) drops significantly below the strike price at expiry,
                            my deposit may be converted to ETH at that strike price. <a href="/dashboard/vault" className="underline text-[var(--warning)] hover:text-[var(--warning)]/80">Learn more about risks</a>
                        </span>
                    </label>

                    <button
                        onClick={() => setStep(2)}
                        disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > walletBalance || !riskAcknowledged}
                        className="w-full py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(204,255,0,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.25)]"
                    >
                        Continue
                    </button>
                </motion.div>
            )}

            {/* Step 2: Approve */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto bg-[var(--volt)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--volt)]/20 relative">
                            <div className="absolute inset-0 bg-[var(--volt)]/10 blur-xl rounded-full" />
                            <LockKey size={32} weight="duotone" className="text-[var(--volt)] relative z-10" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">
                            Approve USDC
                        </h3>
                        <p className="text-[var(--text-secondary)] text-sm max-w-sm mx-auto leading-relaxed">
                            Before depositing, you must authorize the Vault contract to spend your USDC. This is a one-time permission for this amount.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] flex justify-between items-center">
                        <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Amount to Approve</span>
                        <span className="font-mono text-white text-lg font-bold">${numericAmount.toLocaleString()} USDC</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 mt-8">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 lg:py-4 rounded-xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/[0.05] transition-all text-sm lg:text-base order-2 sm:order-1"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleApprove}
                            disabled={isProcessing}
                            className="flex-1 py-3 lg:py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-sm lg:text-base order-1 sm:order-2 shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                        >
                            {isProcessing ? (
                                <>
                                    <CircleNotch size={18} className="animate-spin" />
                                    <span>Approving...</span>
                                </>
                            ) : (
                                "Approve"
                            )}
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Step 3: Confirm Deposit */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="p-5 lg:p-8 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--volt)]/5 blur-3xl pointer-events-none" />

                        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 uppercase tracking-wide">Deposit Summary</h3>

                        <div className="space-y-3 lg:space-y-4">
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Deposit Amount</span>
                                <span className="text-white font-mono text-sm lg:text-base">${numericAmount.toLocaleString()} USDC</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Strategy</span>
                                <span className="text-white text-sm lg:text-base">Thetanuts V3 CSP</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Current APY</span>
                                <span className="text-[var(--success)] font-bold text-sm lg:text-base">{currentAPY}%</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Est. Monthly Yield</span>
                                <span className="text-[var(--volt)] font-mono font-bold text-base lg:text-lg">+${estimatedMonthlyYield.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3">
                                <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Network</span>
                                <span className="text-white text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    Base
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="p-3 lg:p-4 rounded-xl bg-[var(--success)]/5 border border-[var(--success)]/10 flex gap-3">
                        <ShieldCheck size={18} weight="duotone" className="text-[var(--success)] shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--success)]/80 leading-relaxed">
                            Smart contract audited by CertiK. Your funds are protected by time-lock security mechanisms.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                        <button
                            onClick={() => setStep(2)}
                            className="flex-1 py-3 lg:py-4 rounded-xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/[0.05] transition-all text-sm lg:text-base order-2 sm:order-1"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleDeposit}
                            disabled={isProcessing}
                            className="flex-1 py-3 lg:py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-sm lg:text-base order-1 sm:order-2"
                        >
                            {isProcessing ? (
                                <>
                                    <CircleNotch size={18} className="animate-spin" />
                                    <span>Confirming...</span>
                                </>
                            ) : (
                                "Confirm Deposit"
                            )}
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                >
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center mx-auto mb-6 lg:mb-8 relative">
                        <div className="absolute inset-0 bg-[var(--success)]/10 blur-xl rounded-full" />
                        <CheckCircle size={32} weight="fill" className="lg:w-10 lg:h-10 text-[var(--success)] relative z-10" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black text-white mb-2 uppercase tracking-tight">Deposit Successful!</h2>
                    <p className="text-[var(--text-secondary)] mb-2">
                        ${numericAmount.toLocaleString()} USDC is now earning yield.
                    </p>
                    <p className="text-[var(--volt)] text-lg font-mono font-bold mb-8 lg:mb-12">
                        +${estimatedMonthlyYield.toFixed(2)}/month
                    </p>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                    >
                        Back to Dashboard
                        <CaretRight size={18} weight="bold" />
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
