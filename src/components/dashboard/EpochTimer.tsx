"use client";

import { useState, useEffect } from "react";
import { Clock } from "@phosphor-icons/react";
import { getTimeUntilEpochEnd, padZero, formatEpochTimeRemaining } from "@/lib/dates";

interface EpochTimerProps {
    className?: string;
    showLabel?: boolean;
    size?: "sm" | "md" | "lg";
}

/**
 * Real-time Epoch Timer that counts down to the next Friday 8AM UTC
 * This is when Thetanuts V4 options expire and new epoch begins
 */
export function EpochTimer({ className = "", showLabel = true, size = "md" }: EpochTimerProps) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
            setTimeLeft(getTimeUntilEpochEnd());
        }, 0);

        const timer = setInterval(() => {
            setTimeLeft(getTimeUntilEpochEnd());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Clock size={size === "sm" ? 14 : size === "md" ? 16 : 20} className="text-[var(--warning)]" />
                <span className="text-[var(--text-tertiary)] font-mono">--:--:--</span>
            </div>
        );
    }

    const sizeClasses = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Clock size={size === "sm" ? 14 : size === "md" ? 16 : 20} className="text-[var(--warning)]" weight="fill" />
            {showLabel && (
                <span className={`text-[var(--text-tertiary)] ${sizeClasses[size]}`}>Epoch Ends:</span>
            )}
            <div className={`font-mono font-bold text-[var(--warning)] ${sizeClasses[size]}`}>
                {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
                <span>{padZero(timeLeft.hours)}:</span>
                <span>{padZero(timeLeft.minutes)}:</span>
                <span>{padZero(timeLeft.seconds)}</span>
            </div>
        </div>
    );
}

/**
 * Compact version for inline use
 */
export function EpochTimerCompact() {
    const [timeStr, setTimeStr] = useState("...");

    useEffect(() => {
        const update = () => {
            const time = getTimeUntilEpochEnd();
            setTimeStr(formatEpochTimeRemaining(time));
        };

        update();
        const timer = setInterval(update, 60000); // Update every minute for compact version
        return () => clearInterval(timer);
    }, []);

    return <span className="font-mono font-bold text-[var(--warning)]">{timeStr}</span>;
}
