/**
 * Centralized date/time utilities for epoch calculations
 * Thetanuts V4 epochs end every Friday 8AM UTC
 */

export interface EpochTimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
}

/**
 * Get the next Friday 8AM UTC (epoch end time)
 */
export function getNextFridayExpiry(): Date {
    const now = new Date();
    const nextFriday = new Date();

    // Calculate days until Friday (Friday = 5)
    const daysUntilFriday = (5 - now.getUTCDay() + 7) % 7;
    nextFriday.setUTCDate(now.getUTCDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
    nextFriday.setUTCHours(8, 0, 0, 0);

    // If we're past this Friday 8AM, go to next Friday
    if (now.getUTCDay() === 5 && now.getUTCHours() >= 8) {
        nextFriday.setUTCDate(nextFriday.getUTCDate() + 7);
    }

    return nextFriday;
}

/**
 * Get time remaining until next epoch end
 */
export function getTimeUntilEpochEnd(): EpochTimeRemaining {
    const nextFriday = getNextFridayExpiry();
    const now = new Date();
    const diff = nextFriday.getTime() - now.getTime();

    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        totalMs: diff,
    };
}

/**
 * Format epoch time remaining as string
 */
export function formatEpochTimeRemaining(time: EpochTimeRemaining): string {
    if (time.days > 0) {
        return `${time.days}d ${time.hours}h`;
    }
    return `${time.hours}h ${time.minutes}m`;
}

/**
 * Pad number with leading zero
 */
export function padZero(num: number): string {
    return num.toString().padStart(2, "0");
}
