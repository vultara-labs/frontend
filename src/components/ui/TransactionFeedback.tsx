"use client";

import { ReactNode } from "react";
import { CheckCircle, XCircle, CircleNotch, ArrowSquareOut } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

type TransactionStatus = "idle" | "pending" | "success" | "error";

interface TransactionFeedbackProps {
    status: TransactionStatus;
    txHash?: string;
    message?: string;
    onClose?: () => void;
}

export function TransactionFeedback({ status, txHash, message, onClose }: TransactionFeedbackProps) {
    if (status === "idle") return null;

    const config = {
        pending: {
            icon: <CircleNotch size={24} className="animate-spin text-[var(--volt)]" />,
            title: "Transaction Pending",
            subtitle: message || "Please wait while your transaction is being processed...",
            bg: "bg-[var(--volt)]/5 border-[var(--volt)]/20",
        },
        success: {
            icon: <CheckCircle size={24} weight="fill" className="text-[var(--success)]" />,
            title: "Transaction Successful",
            subtitle: message || "Your transaction has been confirmed on-chain.",
            bg: "bg-[var(--success)]/5 border-[var(--success)]/20",
        },
        error: {
            icon: <XCircle size={24} weight="fill" className="text-[var(--error)]" />,
            title: "Transaction Failed",
            subtitle: message || "Something went wrong. Please try again.",
            bg: "bg-[var(--error)]/5 border-[var(--error)]/20",
        },
    }[status];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl border ${config.bg} mb-4`}
            >
                <div className="flex items-start gap-3">
                    {config.icon}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm">{config.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{config.subtitle}</p>
                        {txHash && (
                            <a
                                href={`https://basescan.org/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[var(--volt)] hover:underline mt-2"
                            >
                                View on Explorer <ArrowSquareOut size={12} />
                            </a>
                        )}
                    </div>
                    {onClose && status !== "pending" && (
                        <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-white text-xs">
                            Dismiss
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// Simplified transaction status hook
export function useTransactionStatus() {
    return {
        idle: "idle" as TransactionStatus,
        pending: "pending" as TransactionStatus,
        success: "success" as TransactionStatus,
        error: "error" as TransactionStatus,
    };
}
