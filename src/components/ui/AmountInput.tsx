"use client";

import { motion } from "framer-motion";
import { Warning, TrendUp } from "@phosphor-icons/react";
import Link from "next/link";

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    maxAmount: number;
    balance: number;
    onMax: () => string;

    // Optional customization
    label?: string;
    balanceLabel?: string;
    accentColor?: "volt" | "blue";

    // Validation states
    gasReserve?: number;
    minAmount?: number;

    // Yield preview (for deposit)
    showYieldPreview?: boolean;
    monthlyYield?: number;

    // Empty state
    emptyStateLink?: string;
    emptyStateText?: string;

    // Notice text
    noticeText?: string;
}

export function AmountInput({
    value,
    onChange,
    maxAmount,
    balance,
    onMax,
    label = "Amount (ETH)",
    balanceLabel = "Balance",
    accentColor = "volt",
    gasReserve = 0,
    minAmount = 0.001,
    showYieldPreview = false,
    monthlyYield = 0,
    emptyStateLink,
    emptyStateText,
    noticeText,
}: AmountInputProps) {
    const numAmount = parseFloat(value.replace(/,/g, '')) || 0;

    // Validation with epsilon for floating point
    const epsilon = 0.0001;
    const isOverBalance = numAmount > balance + epsilon;
    const maxDepositable = Math.max(0, balance - gasReserve);
    const isOverMaxDepositable = numAmount > maxDepositable + epsilon;
    const needsGasWarning = isOverMaxDepositable && !isOverBalance && gasReserve > 0;
    const isValidAmount = numAmount >= minAmount && !isOverMaxDepositable;

    // Color variations
    const colors = {
        volt: {
            bg: "bg-[var(--volt)]/10",
            border: "border-[var(--volt)]",
            text: "text-[var(--volt)]",
            glow: "bg-[var(--volt)]/20",
            hover: "hover:bg-[var(--volt)] hover:text-black",
        },
        blue: {
            bg: "bg-blue-500/10",
            border: "border-blue-500",
            text: "text-blue-400",
            glow: "bg-blue-500/20",
            hover: "hover:bg-blue-500 hover:text-white",
        },
    };
    const c = colors[accentColor];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/,/g, '');
        if (!isNaN(Number(val)) || val === '') {
            onChange(val);
        }
    };

    return (
        <div className="mb-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 px-2">
                <span className="label text-[var(--text-secondary)]">{label}</span>
                <span
                    className="text-xs font-mono text-[var(--text-tertiary)] hover:text-white cursor-pointer transition-colors"
                    onClick={() => {
                        const maxVal = onMax();
                        onChange(maxVal);
                    }}
                >
                    {balanceLabel}: {balance.toLocaleString('en-US', { maximumFractionDigits: 6 })} <span className="text-[var(--text-tertiary)]">ETH</span>
                </span>
            </div>

            {/* Input Field */}
            <div className="relative group/input">
                <div className={`absolute inset-0 ${c.glow} blur-xl rounded-2xl opacity-0 group-focus-within/input:opacity-50 transition-opacity`} />
                <motion.div
                    animate={isOverBalance ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`relative flex items-center gap-3 p-5 sm:p-6 rounded-2xl bg-[var(--obsidian-base)] border transition-colors ${isOverBalance
                        ? "border-[var(--error)] bg-[var(--error)]/5"
                        : `border-[var(--border-medium)] group-focus-within/input:${c.border}`
                        }`}
                >
                    <span className={`text-2xl sm:text-3xl ${isOverBalance ? "text-[var(--error)]" : "text-[var(--text-tertiary)]"}`}>
                        Ξ
                    </span>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={value}
                        onChange={handleChange}
                        placeholder="0"
                        className={`w-full bg-transparent text-3xl sm:text-4xl font-black placeholder:text-white/10 outline-none focus-visible:ring-0 ${isOverBalance ? "text-[var(--error)]" : "text-white"
                            }`}
                        autoFocus
                    />
                    <button
                        onClick={() => {
                            const maxVal = onMax();
                            onChange(maxVal);
                        }}
                        className={`min-h-[44px] min-w-[60px] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isOverBalance
                            ? "bg-[var(--error)]/10 text-[var(--error)] hover:bg-[var(--error)] hover:text-white focus-visible:outline-[var(--error)]"
                            : `${c.bg} ${c.text} ${c.hover} focus-visible:outline-${accentColor === 'volt' ? '[var(--volt)]' : 'blue-500'}`
                            }`}
                    >
                        Max
                    </button>
                </motion.div>
            </div>

            {/* Validation Messages */}
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
                    <span className="text-sm font-bold">
                        Leave ~{gasReserve} ETH for gas. Max: {maxDepositable.toFixed(4)} ETH
                    </span>
                </motion.div>
            ) : balance === 0 && emptyStateLink && emptyStateText ? (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-2"
                >
                    <Link
                        href={emptyStateLink}
                        className={`text-sm font-bold ${c.text} hover:underline`}
                    >
                        {emptyStateText}
                    </Link>
                </motion.div>
            ) : showYieldPreview && numAmount >= minAmount ? (
                <div className="mt-4 px-2 space-y-1">
                    <div className={`flex items-center gap-2 ${c.text}`}>
                        <TrendUp size={16} weight="bold" />
                        <span className="text-sm font-bold">
                            Est. yield: ~${monthlyYield.toFixed(2)} / month
                        </span>
                    </div>
                    {numAmount >= maxDepositable - 0.001 && gasReserve > 0 && (
                        <p className="text-xs text-[var(--text-tertiary)] italic pl-6">
                            * {gasReserve} ETH reserved for gas fees
                        </p>
                    )}
                </div>
            ) : noticeText && numAmount > 0 ? (
                <div className="mt-4 px-2 text-xs text-[var(--warning)] flex items-center gap-2">
                    <span className="font-bold">NOTICE:</span>
                    <span>{noticeText}</span>
                </div>
            ) : null}
        </div>
    );
}

// Export validation helpers for parent components
export function useAmountValidation(value: string, balance: number, gasReserve: number = 0, minAmount: number = 0.001) {
    const numAmount = parseFloat(value.replace(/,/g, '')) || 0;
    const epsilon = 0.0001;
    const maxDepositable = Math.max(0, balance - gasReserve);
    const isOverMaxDepositable = numAmount > maxDepositable + epsilon;
    const isValidAmount = numAmount >= minAmount && !isOverMaxDepositable;

    return { numAmount, isValidAmount, maxDepositable };
}
