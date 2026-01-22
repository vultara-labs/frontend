"use client";

import { ReactNode } from "react";

type IconBoxColor = "volt" | "blue" | "warning" | "success" | "error" | "amber" | "purple";
type IconBoxSize = "sm" | "md" | "lg" | "xl";

interface IconBoxProps {
    icon: ReactNode;
    color?: IconBoxColor;
    size?: IconBoxSize;
    className?: string;
}

const sizeClasses: Record<IconBoxSize, string> = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-12 h-12 rounded-xl",
    lg: "w-16 h-16 rounded-2xl",
    xl: "w-20 h-20 rounded-2xl",
};

const colorClasses: Record<IconBoxColor, string> = {
    volt: "bg-[var(--volt)]/10 border-[var(--volt)]/20 text-[var(--volt)]",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    warning: "bg-[var(--warning)]/10 border-[var(--warning)]/20 text-[var(--warning)]",
    success: "bg-[var(--success)]/10 border-[var(--success)]/20 text-[var(--success)]",
    error: "bg-[var(--error)]/10 border-[var(--error)]/20 text-[var(--error)]",
    amber: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
};

/**
 * Reusable icon container with consistent styling across the app
 * Used for feature cards, headers, and action indicators
 */
export function IconBox({ icon, color = "volt", size = "md", className = "" }: IconBoxProps) {
    return (
        <div
            className={`
                ${sizeClasses[size]}
                ${colorClasses[color]}
                border flex items-center justify-center shrink-0
                ${className}
            `}
        >
            {icon}
        </div>
    );
}
