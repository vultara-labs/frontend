"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Gift } from "@phosphor-icons/react";
import Link from "next/link";
import { MISSIONS } from "@/constants/gamification";
import { useState } from "react";

export function MissionsWidget({ balance }: { balance: number }) {
    // Mock state - in real app would come from backend/context
    const [claimedIds, setClaimedIds] = useState<string[]>([]);

    const getStatus = (id: string) => {
        if (claimedIds.includes(id)) return "claimed";

        switch (id) {
            case "connect":
                return "completed"; // Always connected in dashboard
            case "deposit":
                return balance > 100 ? "completed" : "pending";
            default:
                return "pending";
        }
    };

    const handleClaim = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setClaimedIds([...claimedIds, id]);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                    <Gift size={16} className="text-[var(--volt)]" weight="duotone" />
                    Starter Campaign
                </h3>
                <span className="text-[10px] bg-[var(--volt)]/10 text-[var(--volt)] px-2 py-0.5 rounded border border-[var(--volt)]/20 font-mono">
                    SEASON 1
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MISSIONS.map((mission, index) => {
                    const status = getStatus(mission.id);
                    const isCompleted = status === "completed" || status === "claimed";

                    return (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-4 rounded-2xl border transition-all duration-300 ${isCompleted
                                    ? "bg-[var(--success)]/5 border-[var(--success)]/20"
                                    : "bg-[var(--obsidian-surface)] border-[var(--border-subtle)] hover:border-[var(--volt)]/30"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCompleted ? "bg-[var(--success)]/10 text-[var(--success)]" : "bg-[var(--surface-highlight)] text-[var(--text-secondary)]"
                                    }`}>
                                    <mission.icon size={18} weight="duotone" />
                                </div>
                                {status === "claimed" ? (
                                    <span className="text-[10px] font-bold uppercase text-[var(--success)] flex items-center gap-1">
                                        <CheckCircle weight="fill" /> Done
                                    </span>
                                ) : status === "completed" ? (
                                    <button
                                        onClick={(e) => handleClaim(mission.id, e)}
                                        className="text-[10px] font-bold uppercase bg-[var(--volt)] text-black px-2 py-1 rounded hover:brightness-110 active:scale-95 transition-all"
                                    >
                                        Claim
                                    </button>
                                ) : (
                                    <span className="text-[10px] font-bold text-[var(--text-tertiary)] bg-white/5 px-2 py-1 rounded">
                                        + {mission.xp} XP
                                    </span>
                                )}
                            </div>

                            <h4 className={`text-sm font-bold mb-1 ${isCompleted ? "text-[var(--success)]" : "text-white"}`}>
                                {mission.title}
                            </h4>
                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">
                                {mission.desc}
                            </p>

                            {!isCompleted && (
                                <Link
                                    href={mission.id === "nova" ? "/dashboard/ai" : mission.id === "vault" ? "/dashboard/vault" : mission.id === "deposit" ? "/dashboard/deposit" : "#"}
                                    className="text-[10px] font-bold uppercase tracking-wider text-[var(--volt)] flex items-center gap-1 group-hover:gap-2 transition-all"
                                >
                                    Start Mission <ArrowRight size={12} />
                                </Link>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
