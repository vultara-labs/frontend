"use client";

import { useState, useEffect } from "react";
import { Clock } from "@phosphor-icons/react";

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
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const calculateTimeLeft = () => {
            const now = new Date();
            const nextFriday = new Date();

            // Calculate next Friday 8AM UTC
            const daysUntilFriday = (5 - now.getUTCDay() + 7) % 7;
            nextFriday.setUTCDate(now.getUTCDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
            nextFriday.setUTCHours(8, 0, 0, 0);

            // If we're past this Friday 8AM, go to next Friday
            if (now.getUTCDay() === 5 && now.getUTCHours() >= 8) {
                nextFriday.setUTCDate(nextFriday.getUTCDate() + 7);
            }

            const diff = nextFriday.getTime() - now.getTime();

            if (diff <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
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

    const padZero = (num: number) => num.toString().padStart(2, "0");

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
            const now = new Date();
            const nextFriday = new Date();
            const daysUntilFriday = (5 - now.getUTCDay() + 7) % 7;
            nextFriday.setUTCDate(now.getUTCDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
            nextFriday.setUTCHours(8, 0, 0, 0);
            if (now.getUTCDay() === 5 && now.getUTCHours() >= 8) {
                nextFriday.setUTCDate(nextFriday.getUTCDate() + 7);
            }
            const diff = nextFriday.getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setTimeStr(`${days}d ${hours}h`);
        };

        update();
        const timer = setInterval(update, 60000); // Update every minute for compact version
        return () => clearInterval(timer);
    }, []);

    return <span className="font-mono font-bold text-[var(--warning)]">{timeStr}</span>;
}
