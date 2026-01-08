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
        <div className="p-8 max-w-2xl mx-auto min-h-full flex flex-col justify-center">
            {/* Header */}
            <div className="mb-12">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors mb-6 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-[var(--volt)]/10 text-[var(--volt)]">
                        <ArrowDownToLine size={24} />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                        Withdraw to IDR
                    </h1>
                </div>
                <p className="text-[#A1A1AA] ml-12">
                    Instant off-ramp to Indonesian Bank Accounts via IDRX.
                </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-4 mb-12 ml-1">
                {[
                    { num: 1, label: "Amount" },
                    { num: 2, label: "Confirm" },
                    { num: 3, label: "Success" }
                ].map((s, i) => (
                    <div key={s.num} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s.num
                                ? "bg-[var(--volt)] text-black shadow-[0_0_15px_var(--volt-glow)]"
                                : "bg-white/[0.05] text-[#A1A1AA] border border-white/[0.05]"
                            }`}>
                            {step > s.num ? <Check size={14} /> : s.num}
                        </div>
                        <span className={`text-sm tracking-wide font-medium ${step >= s.num ? "text-white" : "text-[#A1A1AA]/50"}`}>
                            {s.label}
                        </span>
                        {i < 2 && <div className={`w-8 h-px transition-colors duration-300 ${step > s.num ? "bg-[var(--volt)]" : "bg-white/[0.05]"}`} />}
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
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.12] transition-colors focus-within:border-[var(--volt)]/50 focus-within:bg-[var(--volt)]/[0.02]">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
                                Withdrawal Amount (USDC)
                            </label>
                            <span className="text-xs text-[#A1A1AA]">
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

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-[#A1A1AA]">You will receive</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">IDR Estimation</span>
                        </div>
                        <p className="text-3xl font-mono font-bold text-white tracking-tight">
                            Rp {estimatedIDR.toLocaleString('id-ID')}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-[#52525B]">
                            <span>Rate: 1 USDC = Rp 15,850</span>
                            <span>•</span>
                            <span>Fee: {convenienceFee}%</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border border-white/[0.05] flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white mb-0.5">Bank Central Asia (BCA)</p>
                                <p className="text-xs text-[#A1A1AA] font-mono">**** 4521</p>
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
                    <div className="p-8 rounded-3xl bg-[var(--obsidian-surface)] border border-white/[0.08] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--volt)]/5 blur-3xl pointer-events-none" />

                        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Confirmation</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-white/[0.05]">
                                <span className="text-sm text-[#A1A1AA]">Amount</span>
                                <span className="text-white font-mono">${parseFloat(amount).toLocaleString()} USDC</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/[0.05]">
                                <span className="text-sm text-[#A1A1AA]">Fee ({convenienceFee}%)</span>
                                <span className="text-white font-mono">-${(parseFloat(amount) * 0.005).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/[0.05]">
                                <span className="text-sm text-[#A1A1AA]">Total To Receive</span>
                                <span className="text-[var(--volt)] font-mono font-bold text-lg">Rp {estimatedIDR.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span className="text-sm text-[#A1A1AA]">Destination</span>
                                <span className="text-white text-right">BCA **** 4521<br /><span className="text-xs text-[#52525B]">John Doe</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-200/80 leading-relaxed">
                            Please verify the bank details carefully. Transactions on the blockchain cannot be reversed once confirmed.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setStep(1)}
                            className="flex-1 py-4 rounded-xl border border-white/[0.1] text-white font-bold uppercase tracking-widest hover:bg-white/[0.05] transition-all"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleWithdraw}
                            disabled={isProcessing}
                            className="flex-1 py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
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
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full" />
                        <Check size={40} className="text-emerald-500 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Withdrawal Initiated</h2>
                    <p className="text-[#A1A1AA] mb-12">
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
