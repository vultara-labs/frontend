"use client";

import { motion } from "framer-motion";
import { CircleNotch } from "@phosphor-icons/react";

type ProcessingColor = "volt" | "blue" | "white";

interface ProcessingStateProps {
    title?: string;
    description?: string;
    color?: ProcessingColor;
    className?: string;
}

const colorClasses: Record<ProcessingColor, { spinner: string; glow: string }> = {
    volt: {
        spinner: "text-[var(--volt)]",
        glow: "bg-[var(--volt)]/20",
    },
    blue: {
        spinner: "text-blue-400",
        glow: "bg-blue-500/20",
    },
    white: {
        spinner: "text-white",
        glow: "bg-white/20",
    },
};

/**
 * Reusable processing/loading state for transaction flows
 * Shows animated spinner with optional title and description
 */
export function ProcessingState({
    title = "Processing",
    description = "Please confirm in your wallet...",
    color = "volt",
    className = "",
}: ProcessingStateProps) {
    const colors = colorClasses[color];

    return (
        <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`flex flex-col items-center justify-center py-12 ${className}`}
        >
            <div className="relative mb-8">
                <div className={`absolute inset-0 ${colors.glow} blur-xl rounded-full`} />
                <CircleNotch size={64} className={`${colors.spinner} animate-spin relative z-10`} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
                {title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
                {description}
            </p>
        </motion.div>
    );
}
