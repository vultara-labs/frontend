"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendUp, TrendDown, ShieldCheck, ChartLineUp, Info, CaretRight } from "@phosphor-icons/react";

// Strategy Types
export type StrategyType = "covered-call" | "protective-put" | "collar";

export interface Strategy {
    id: StrategyType;
    name: string;
    shortName: string;
    description: string;
    riskLevel: "low" | "medium" | "high";
    apyRange: { min: number; max: number };
    icon: React.ReactNode;
    color: string;
    benefits: string[];
    risks: string[];
    idealFor: string;
}

export const STRATEGIES: Strategy[] = [
    {
        id: "covered-call",
        name: "Covered Call",
        shortName: "CC",
        description: "Sell call options on your ETH to earn premium income. Best when you expect sideways or slight upward movement.",
        riskLevel: "medium",
        apyRange: { min: 4, max: 12 },
        icon: <TrendUp size={20} weight="fill" />,
        color: "var(--volt)",
        benefits: [
            "Earn passive income from premiums",
            "Works well in sideways markets",
            "Keep ETH if price stays below strike",
        ],
        risks: [
            "Capped upside if ETH moons",
            "Still exposed to ETH downside",
        ],
        idealFor: "Bullish-neutral outlook",
    },
    {
        id: "protective-put",
        name: "Protective Put",
        shortName: "PP",
        description: "Buy put options to protect your ETH from downside. Like insurance for your holdings.",
        riskLevel: "low",
        apyRange: { min: -2, max: 5 },
        icon: <ShieldCheck size={20} weight="fill" />,
        color: "var(--success)",
        benefits: [
            "Downside protection guaranteed",
            "Unlimited upside potential",
            "Sleep well during volatility",
        ],
        risks: [
            "Premium cost reduces returns",
            "Protection expires each epoch",
        ],
        idealFor: "Risk-averse / uncertain market",
    },
    {
        id: "collar",
        name: "Collar Strategy",
        shortName: "COL",
        description: "Combine covered call + protective put. Cap both upside and downside for a balanced approach.",
        riskLevel: "low",
        apyRange: { min: 2, max: 8 },
        icon: <ChartLineUp size={20} weight="fill" />,
        color: "var(--info)",
        benefits: [
            "Limited downside risk",
            "Lower cost than pure protection",
            "Predictable outcome range",
        ],
        risks: [
            "Capped upside potential",
            "Complexity in execution",
        ],
        idealFor: "Conservative / balanced approach",
    },
];

interface StrategySelectorProps {
    selectedStrategy: StrategyType;
    onSelectStrategy: (strategy: StrategyType) => void;
    className?: string;
}

export function StrategySelector({ selectedStrategy, onSelectStrategy, className = "" }: StrategySelectorProps) {
    const [showDetails, setShowDetails] = useState<StrategyType | null>(null);

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Choose Strategy</h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[var(--volt)]/10 text-[var(--volt)] font-medium">New</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STRATEGIES.map((strategy) => (
                    <motion.button
                        key={strategy.id}
                        onClick={() => onSelectStrategy(strategy.id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-xl border text-left transition-all ${selectedStrategy === strategy.id
                                ? "bg-white/[0.05] border-[var(--volt)]/50"
                                : "bg-white/[0.02] border-[var(--border-subtle)] hover:bg-white/[0.04]"
                            }`}
                    >
                        {/* Selected indicator */}
                        {selectedStrategy === strategy.id && (
                            <motion.div
                                layoutId="strategy-indicator"
                                className="absolute inset-0 rounded-xl border-2 border-[var(--volt)] pointer-events-none"
                            />
                        )}

                        <div className="flex items-start justify-between mb-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${strategy.color} 10%, transparent)`,
                                    color: strategy.color,
                                }}
                            >
                                {strategy.icon}
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${strategy.riskLevel === "low" ? "bg-[var(--success)]/10 text-[var(--success)]" :
                                    strategy.riskLevel === "medium" ? "bg-[var(--warning)]/10 text-[var(--warning)]" :
                                        "bg-[var(--error)]/10 text-[var(--error)]"
                                }`}>
                                {strategy.riskLevel.toUpperCase()}
                            </span>
                        </div>

                        <h4 className="text-sm font-bold text-white mb-1">{strategy.name}</h4>
                        <p className="text-[10px] text-[var(--text-tertiary)] mb-3 line-clamp-2">
                            {strategy.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-[var(--text-tertiary)]">APY Range</p>
                                <p className="text-sm font-bold font-mono" style={{ color: strategy.color }}>
                                    {strategy.apyRange.min}% - {strategy.apyRange.max}%
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDetails(showDetails === strategy.id ? null : strategy.id);
                                }}
                                className="p-1.5 rounded-lg hover:bg-white/[0.05] text-[var(--text-tertiary)] hover:text-white transition-colors"
                            >
                                <Info size={14} />
                            </button>
                        </div>

                        {/* Expanded details */}
                        {showDetails === strategy.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-3 pt-3 border-t border-[var(--border-subtle)]"
                            >
                                <p className="text-[10px] text-[var(--text-tertiary)] mb-2">
                                    <strong className="text-white">Best for:</strong> {strategy.idealFor}
                                </p>
                                <div className="space-y-1">
                                    {strategy.benefits.slice(0, 2).map((benefit, i) => (
                                        <p key={i} className="text-[10px] text-[var(--success)] flex items-center gap-1">
                                            <span>✓</span> {benefit}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

// Strategy Details Panel for expanded view
export function StrategyDetails({ strategyId }: { strategyId: StrategyType }) {
    const strategy = STRATEGIES.find(s => s.id === strategyId);
    if (!strategy) return null;

    return (
        <div className="p-5 rounded-xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)]">
            <div className="flex items-center gap-3 mb-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                        backgroundColor: `color-mix(in srgb, ${strategy.color} 10%, transparent)`,
                        color: strategy.color,
                    }}
                >
                    {strategy.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
                    <p className="text-xs text-[var(--text-tertiary)]">{strategy.idealFor}</p>
                </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-4">{strategy.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h4 className="text-xs font-bold text-[var(--success)] mb-2">Benefits</h4>
                    <ul className="space-y-1">
                        {strategy.benefits.map((b, i) => (
                            <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                                <span className="text-[var(--success)] mt-0.5">✓</span>
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-[var(--warning)] mb-2">Risks</h4>
                    <ul className="space-y-1">
                        {strategy.risks.map((r, i) => (
                            <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                                <span className="text-[var(--warning)] mt-0.5">⚠</span>
                                {r}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-tertiary)]">Expected APY Range</span>
                    <span className="text-sm font-bold font-mono" style={{ color: strategy.color }}>
                        {strategy.apyRange.min}% — {strategy.apyRange.max}%
                    </span>
                </div>
            </div>
        </div>
    );
}
