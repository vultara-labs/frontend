"use client";

import { motion } from "framer-motion";
import { ACCESS_LEVELS } from "@/constants";

export function ProtocolStatus({ balance }: { balance: number }) {
    const currentLevelIndex = ACCESS_LEVELS.findIndex((level, i) => {
        const nextLevel = ACCESS_LEVELS[i + 1];
        return balance >= level.min && (!nextLevel || balance < nextLevel.min);
    });

    const safeIndex = currentLevelIndex === -1 ? 0 : currentLevelIndex;
    const currentLevel = ACCESS_LEVELS[safeIndex];
    const nextLevel = ACCESS_LEVELS[safeIndex + 1];

    let progress = 100;
    let nextMilestone = "MAX LEVEL";

    if (nextLevel) {
        const span = nextLevel.min - currentLevel.min;
        const achieved = balance - currentLevel.min;
        progress = Math.min(100, Math.max(0, (achieved / span) * 100));
        nextMilestone = `$${(nextLevel.min - balance).toLocaleString()} to ${nextLevel.name}`;
    }

    return (
        <div className="flex flex-col h-full justify-between w-full">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] block mb-1">Access Tier</span>
                    <div className="flex items-center gap-2">
                        <currentLevel.icon size={20} weight="duotone" className={currentLevel.color} />
                        <span className={`text-xl font-black tracking-tight uppercase ${currentLevel.color}`}>{currentLevel.name}</span>
                    </div>
                </div>
                <div className="px-2 py-1 rounded bg-white/[0.03] border border-[var(--border-subtle)]">
                    <span className="text-[10px] font-mono text-[var(--volt)]">LVL {safeIndex + 1}</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-1.5 w-full bg-[var(--obsidian-surface)] rounded-full overflow-hidden border border-[var(--border-subtle)] relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full relative z-10 ${safeIndex >= 2 ? "bg-[var(--volt)] shadow-[0_0_12px_var(--volt)]" : "bg-white"}`}
                    />
                </div>

                <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-bold">
                    {nextMilestone !== "MAX LEVEL" ? (
                        <>
                            Deposit <span className="text-white font-mono gap-1 inline-flex">{nextMilestone.split(" to ")[0]}</span> to unlock {nextLevel?.name}
                        </>
                    ) : (
                        <span className="text-[var(--volt)]">Maximum Status Achieved</span>
                    )}
                </p>
            </div>
        </div>
    );
}
