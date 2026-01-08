"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    Check,
    Building2,
    AlertTriangle,
    Loader2,
    ChevronRight,
    ArrowDownToLine
} from "lucide-react";

export default function WithdrawPage() {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const maxBalance = 124592.50;
    const convenienceFee = 0.5;
    const estimatedIDR = parseFloat(amount || "0") * 15850;

    const handleWithdraw = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 2000);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto min-h-full flex flex-col justify-center">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors mb-4 lg:mb-6 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-[var(--volt)]/10 text-[var(--volt)]">
                        <ArrowDownToLine size={20} className="lg:w-6 lg:h-6" />
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-white">
                        Withdraw to IDR
                    </h1>
                </div>
                <p className="text-[var(--text-secondary)] ml-10 lg:ml-12 text-sm lg:text-base">
                    Instant off-ramp to Indonesian Bank Accounts via IDRX.
                </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 sm:gap-4 mb-8 lg:mb-12 ml-1 overflow-x-auto">
                {[
                    { num: 1, label: "Amount" },
                    { num: 2, label: "Confirm" },
                    { num: 3, label: "Success" }
                ].map((s, i) => (
                    <div key={s.num} className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${step >= s.num
                            ? "bg-[var(--volt)] text-black shadow-[0_0_15px_var(--volt-glow)]"
                            : "bg-white/[0.05] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                            }`}>
                            {step > s.num ? <Check size={14} /> : s.num}
                        </div>
                        <span className={`text-xs sm:text-sm tracking-wide font-medium whitespace-nowrap ${step >= s.num ? "text-white" : "text-[var(--text-muted)]"}`}>
                            {s.label}
                        </span>
                        {i < 2 && <div className={`w-6 sm:w-8 h-px transition-colors duration-300 ${step > s.num ? "bg-[var(--volt)]" : "bg-[var(--border-subtle)]"}`} />}
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
                                Withdrawal Amount (USDC)
                            </label>
                            <span className="text-xs text-[var(--text-secondary)]">
                                Balance: <span className="text-white font-mono">${maxBalance.toLocaleString()}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl text-[#A1A1AA]">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-transparent text-4xl font-mono font-medium text-white placeholder:text-white/10 outline-none"
                                autoFocus
                            />
                            <button
                                onClick={() => setAmount(maxBalance.toString())}
                                className="px-3 py-1.5 rounded-lg bg-[var(--volt)]/10 text-[var(--volt)] text-xs font-bold hover:bg-[var(--volt)]/20 transition-colors uppercase tracking-wider"
                            >
                                Max
                            </button>
                        </div>
                    </div>

                    <div className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-[var(--border-subtle)]">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-[var(--text-secondary)]">You will receive</span>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">IDR Estimation</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                            Rp {estimatedIDR.toLocaleString('id-ID')}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-tertiary)]">
                            <span>Rate: 1 USDC = Rp 15,850</span>
                            <span>•</span>
                            <span>Fee: {convenienceFee}%</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--border-subtle)] flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[var(--info)]/10 flex items-center justify-center text-[var(--info)]">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white mb-0.5">Bank Central Asia (BCA)</p>
                                <p className="text-xs text-[var(--text-secondary)] font-mono">**** 4521</p>
                            </div>
                        </div>
                        <button className="text-xs text-[var(--volt)] font-bold uppercase tracking-wider group-hover:underline">
                            Change
                        </button>
                    </div>

                    <button
                        onClick={() => setStep(2)}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="w-full py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(204,255,0,0.15)] hover:shadow-[0_0_30px_rgba(204,255,0,0.25)]"
                    >
                        Continue
                    </button>
                </motion.div>
            )}

            {/* Step 2: Confirm */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="p-5 lg:p-8 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--volt)]/5 blur-3xl pointer-events-none" />

                        <h3 className="text-base lg:text-lg font-bold text-white mb-4 lg:mb-6 uppercase tracking-wide">Confirmation</h3>

                        <div className="space-y-3 lg:space-y-4">
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs lg:text-sm text-[var(--text-secondary)]">Amount</span>
                                <span className="text-white font-mono text-sm lg:text-base">${parseFloat(amount).toLocaleString()} USDC</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs lg:text-sm text-[var(--text-secondary)]">Fee ({convenienceFee}%)</span>
                                <span className="text-white font-mono text-sm lg:text-base">-${(parseFloat(amount) * 0.005).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3 border-b border-[var(--border-subtle)]">
                                <span className="text-xs lg:text-sm text-[var(--text-secondary)]">Total To Receive</span>
                                <span className="text-[var(--volt)] font-mono font-bold text-base lg:text-lg">Rp {estimatedIDR.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between py-2 lg:py-3">
                                <span className="text-xs lg:text-sm text-[var(--text-secondary)]">Destination</span>
                                <span className="text-white text-right text-sm">BCA **** 4521<br /><span className="text-xs text-[var(--text-tertiary)]">John Doe</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 lg:p-4 rounded-xl bg-[var(--warning)]/5 border border-[var(--warning)]/10 flex gap-3">
                        <AlertTriangle size={18} className="text-[var(--warning)] shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--warning)]/80 leading-relaxed">
                            Please verify the bank details carefully. Transactions on the blockchain cannot be reversed once confirmed.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-3 lg:py-4 rounded-xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/[0.05] transition-all text-sm lg:text-base order-2 sm:order-1"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleWithdraw}
                            disabled={isProcessing}
                            className="flex-1 py-3 lg:py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-sm lg:text-base order-1 sm:order-2"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Processing</span>
                                </>
                            ) : (
                                "Confirm"
                            )}
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                >
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center mx-auto mb-6 lg:mb-8 relative">
                        <div className="absolute inset-0 bg-[var(--success)]/10 blur-xl rounded-full" />
                        <Check size={32} className="lg:w-10 lg:h-10 text-[var(--success)] relative z-10" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black text-white mb-2 uppercase tracking-tight">Withdrawal Initiated</h2>
                    <p className="text-[var(--text-secondary)] mb-8 lg:mb-12">
                        Rp {estimatedIDR.toLocaleString('id-ID')} is being processed to your account.
                    </p>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                    >
                        Back to Dashboard
                        <ChevronRight size={18} />
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
