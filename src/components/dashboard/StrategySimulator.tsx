"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendUp, TrendDown, Equals, Sparkle, CaretDown, CaretUp } from "@phosphor-icons/react";
import { StrategyType, STRATEGIES } from "./StrategySelector";

interface SimulatorProps {
    ethPrice: number;
    depositAmount: number;
    selectedStrategy: StrategyType;
    className?: string;
}

interface ScenarioResult {
    scenarioName: string;
    priceChange: number;
    finalPrice: number;
    returnPercent: number;
    returnUSD: number;
    outcome: "profit" | "loss" | "neutral";
}

/**
 * Strategy Simulator - What-if scenarios for different market conditions
 */
export function StrategySimulator({ ethPrice, depositAmount, selectedStrategy, className = "" }: SimulatorProps) {
    const [customPriceChange, setCustomPriceChange] = useState(0);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const strategy = STRATEGIES.find(s => s.id === selectedStrategy);
    const depositUSD = depositAmount * ethPrice;

    // Calculate scenario outcomes based on strategy
    const calculateOutcome = useCallback((priceChangePercent: number): ScenarioResult => {
        const finalPrice = ethPrice * (1 + priceChangePercent / 100);
        let returnPercent = 0;
        let scenarioName = "";

        // Strategy-specific calculations
        switch (selectedStrategy) {
            case "covered-call":
                // Covered Call: Earn premium, but capped upside
                const ccPremium = strategy?.apyRange.max ? strategy.apyRange.max / 52 : 0.15; // Weekly premium
                if (priceChangePercent <= 0) {
                    // ETH down or flat: Keep ETH + premium, but suffer ETH loss
                    returnPercent = ccPremium + priceChangePercent;
                    scenarioName = priceChangePercent < -10 ? "Bearish (Loss)" : "Sideways";
                } else if (priceChangePercent <= 10) {
                    // ETH up slightly: Keep ETH + premium
                    returnPercent = ccPremium + priceChangePercent;
                    scenarioName = "Mild Bullish (Ideal)";
                } else {
                    // ETH moons: Capped at strike (~10%)
                    returnPercent = 10 + ccPremium;
                    scenarioName = "Moon (Capped)";
                }
                break;

            case "protective-put":
                // Protective Put: Pay premium for downside protection
                const ppPremium = 2; // ~2% weekly cost for protection
                if (priceChangePercent <= -10) {
                    // ETH crashes: Protected, only lose premium
                    returnPercent = -ppPremium;
                    scenarioName = "Crash (Protected)";
                } else if (priceChangePercent < 0) {
                    // ETH down slightly: Lose some + premium
                    returnPercent = priceChangePercent - ppPremium;
                    scenarioName = "Dip (Partial Loss)";
                } else {
                    // ETH up: Full upside minus premium
                    returnPercent = priceChangePercent - ppPremium;
                    scenarioName = "Bullish (Full Upside)";
                }
                break;

            case "collar":
                // Collar: Limited upside and downside
                const collarPremium = 0.5; // Net premium (CC income - PP cost)
                if (priceChangePercent < -10) {
                    // ETH crashes: Protected at -10%
                    returnPercent = -10 + collarPremium;
                    scenarioName = "Crash (Floor Hit)";
                } else if (priceChangePercent > 10) {
                    // ETH moons: Capped at 10%
                    returnPercent = 10 + collarPremium;
                    scenarioName = "Moon (Ceiling Hit)";
                } else {
                    // Normal range: Follow ETH + small premium
                    returnPercent = priceChangePercent + collarPremium;
                    scenarioName = "Range Bound";
                }
                break;
        }

        const returnUSD = depositUSD * (returnPercent / 100);
        const outcome = returnPercent > 0.5 ? "profit" : returnPercent < -0.5 ? "loss" : "neutral";

        return { scenarioName, priceChange: priceChangePercent, finalPrice, returnPercent, returnUSD, outcome };
    }, [ethPrice, depositUSD, selectedStrategy, strategy]);

    // Predefined scenarios
    const scenarios = useMemo(() => [
        calculateOutcome(-30), // Crash
        calculateOutcome(-10), // Correction
        calculateOutcome(0),   // Sideways
        calculateOutcome(10),  // Bullish
        calculateOutcome(30),  // Moon
    ], [calculateOutcome]);

    // Custom scenario
    const customScenario = useMemo(() => calculateOutcome(customPriceChange), [calculateOutcome, customPriceChange]);

    if (!strategy) return null;

    return (
        <div className={`p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--info)]/10 border border-[var(--info)]/20 flex items-center justify-center">
                        <Calculator size={16} className="text-[var(--info)]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide">Strategy Simulator</h3>
                        <p className="text-[10px] text-[var(--text-tertiary)]">See how {strategy.name} performs in different scenarios</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-[var(--text-tertiary)]">Simulating</p>
                    <p className="text-sm font-bold text-white font-mono">{depositAmount.toFixed(2)} ETH</p>
                </div>
            </div>

            {/* Scenario Cards */}
            <div className="grid grid-cols-5 gap-2 mb-6">
                {scenarios.map((scenario, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`p-3 rounded-xl text-center ${scenario.outcome === "profit" ? "bg-[var(--success)]/5 border border-[var(--success)]/20" :
                            scenario.outcome === "loss" ? "bg-[var(--error)]/5 border border-[var(--error)]/20" :
                                "bg-white/[0.02] border border-[var(--border-subtle)]"
                            }`}
                    >
                        <div className="flex items-center justify-center gap-1 mb-1">
                            {scenario.priceChange > 0 ? (
                                <TrendUp size={12} className="text-[var(--success)]" />
                            ) : scenario.priceChange < 0 ? (
                                <TrendDown size={12} className="text-[var(--error)]" />
                            ) : (
                                <Equals size={12} className="text-[var(--text-tertiary)]" />
                            )}
                            <span className={`text-[10px] font-bold ${scenario.priceChange > 0 ? "text-[var(--success)]" :
                                scenario.priceChange < 0 ? "text-[var(--error)]" :
                                    "text-[var(--text-tertiary)]"
                                }`}>
                                {scenario.priceChange > 0 ? "+" : ""}{scenario.priceChange}%
                            </span>
                        </div>
                        <p className={`text-xs font-bold font-mono ${scenario.outcome === "profit" ? "text-[var(--success)]" :
                            scenario.outcome === "loss" ? "text-[var(--error)]" :
                                "text-white"
                            }`}>
                            {scenario.returnPercent > 0 ? "+" : ""}{scenario.returnPercent.toFixed(1)}%
                        </p>
                        <p className="text-[9px] text-[var(--text-tertiary)] mt-1 truncate">
                            {scenario.scenarioName}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Custom Scenario Slider */}
            <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-[var(--border-subtle)] hover:bg-white/[0.04] transition-colors mb-4"
            >
                <div className="flex items-center gap-2">
                    <Sparkle size={14} className="text-[var(--volt)]" />
                    <span className="text-xs font-medium text-[var(--text-secondary)]">Custom Scenario</span>
                </div>
                {showAdvanced ? <CaretUp size={14} className="text-[var(--text-tertiary)]" /> : <CaretDown size={14} className="text-[var(--text-tertiary)]" />}
            </button>

            {showAdvanced && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-4"
                >
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[var(--text-tertiary)]">ETH Price Change</span>
                            <span className={`text-sm font-bold font-mono ${customPriceChange > 0 ? "text-[var(--success)]" :
                                customPriceChange < 0 ? "text-[var(--error)]" :
                                    "text-white"
                                }`}>
                                {customPriceChange > 0 ? "+" : ""}{customPriceChange}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={customPriceChange}
                            onChange={(e) => setCustomPriceChange(parseInt(e.target.value))}
                            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
                            style={{
                                background: `linear-gradient(to right, var(--error) 0%, var(--text-tertiary) 50%, var(--success) 100%)`
                            }}
                        />
                        <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-1">
                            <span>-50%</span>
                            <span>0%</span>
                            <span>+50%</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)]">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-[10px] text-[var(--text-tertiary)] mb-1">ETH Price</p>
                                <p className="text-sm font-bold font-mono text-white">
                                    ${customScenario.finalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Your Return</p>
                                <p className={`text-sm font-bold font-mono ${customScenario.outcome === "profit" ? "text-[var(--success)]" :
                                    customScenario.outcome === "loss" ? "text-[var(--error)]" :
                                        "text-white"
                                    }`}>
                                    {customScenario.returnPercent > 0 ? "+" : ""}{customScenario.returnPercent.toFixed(2)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[var(--text-tertiary)] mb-1">P/L USD</p>
                                <p className={`text-sm font-bold font-mono ${customScenario.outcome === "profit" ? "text-[var(--success)]" :
                                    customScenario.outcome === "loss" ? "text-[var(--error)]" :
                                        "text-white"
                                    }`}>
                                    {customScenario.returnUSD > 0 ? "+" : ""}${Math.abs(customScenario.returnUSD).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
