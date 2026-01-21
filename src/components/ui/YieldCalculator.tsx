"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendUp, Warning, Info } from "@phosphor-icons/react";
import { RISK } from "@/constants";

interface YieldProjection {
    period: string;
    low: number;
    expected: number;
    high: number;
}

export function YieldCalculator() {
    const [amount, setAmount] = useState<string>("1000");
    const [period, setPeriod] = useState<"month" | "quarter" | "year">("year");

    const ethPrice = 2500;
    const amountUSD = parseFloat(amount.replace(/,/g, '')) || 0;
    const amountETH = amountUSD / ethPrice;

    // Format number with thousand separators
    const formatNumber = (num: number) => num.toLocaleString('en-US', { maximumFractionDigits: 0 });

    const projections = useMemo((): YieldProjection[] => {
        const { LOW, NORMAL, HIGH } = RISK.VOLATILITY_BANDS;
        const multiplier = { month: 1 / 12, quarter: 3 / 12, year: 1 }[period];

        return [
            {
                period: "Low Vol",
                low: amountUSD * (LOW.apyMin / 100) * multiplier,
                expected: amountUSD * ((LOW.apyMin + LOW.apyMax) / 2 / 100) * multiplier,
                high: amountUSD * (LOW.apyMax / 100) * multiplier,
            },
            {
                period: "Normal",
                low: amountUSD * (NORMAL.apyMin / 100) * multiplier,
                expected: amountUSD * ((NORMAL.apyMin + NORMAL.apyMax) / 2 / 100) * multiplier,
                high: amountUSD * (NORMAL.apyMax / 100) * multiplier,
            },
            {
                period: "High Vol",
                low: amountUSD * (HIGH.apyMin / 100) * multiplier,
                expected: amountUSD * ((HIGH.apyMin + HIGH.apyMax) / 2 / 100) * multiplier,
                high: amountUSD * (HIGH.apyMax / 100) * multiplier,
            },
        ];
    }, [amountUSD, period]);

    const downsideRisk = useMemo(() => {
        return RISK.DOWNSIDE_SCENARIOS.map(scenario => ({
            label: scenario.label,
            dropPercent: scenario.dropPercent,
            loss: RISK.calculateDownsideLoss(amountUSD, scenario.dropPercent),
        }));
    }, [amountUSD]);

    return (
        <div className="p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-subtle)]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--volt)]/10 flex items-center justify-center">
                    <Calculator size={20} className="text-[var(--volt)]" />
                </div>
                <div>
                    <h3 className="text-white font-bold">Yield Calculator</h3>
                    <p className="text-xs text-[var(--text-tertiary)]">Estimate your potential returns</p>
                </div>
            </div>

            {/* Input */}
            <div className="mb-6">
                <label className="text-xs text-[var(--text-secondary)] mb-2 block">Deposit Amount (USD)</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">$</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={amountUSD > 0 ? formatNumber(amountUSD) : amount}
                        onChange={(e) => setAmount(e.target.value.replace(/,/g, ''))}
                        className="w-full bg-black/30 border border-[var(--border-subtle)] rounded-xl py-3 pl-8 pr-4 text-white font-bold focus:outline-none focus:border-[var(--volt)]/50"
                        placeholder="1,000"
                    />
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">≈ {amountETH.toFixed(4)} ETH</p>
            </div>

            {/* Period Selector */}
            <div className="flex gap-2 mb-6">
                {(["month", "quarter", "year"] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${period === p
                            ? "bg-[var(--volt)] text-black"
                            : "bg-white/5 text-[var(--text-secondary)] hover:bg-white/10"
                            }`}
                    >
                        {p === "month" ? "1 Month" : p === "quarter" ? "3 Months" : "1 Year"}
                    </button>
                ))}
            </div>

            {/* Yield Projections */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <TrendUp size={14} className="text-[var(--success)]" />
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">
                        Yield Projections
                    </span>
                </div>
                <div className="space-y-2">
                    {projections.map((proj) => (
                        <div key={proj.period} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                            <span className="text-xs text-[var(--text-secondary)]">{proj.period}</span>
                            <div className="text-right">
                                <span className="text-sm font-bold text-[var(--volt)]">
                                    +${formatNumber(proj.expected)}
                                </span>
                                <span className="text-xs text-[var(--text-tertiary)] ml-2">
                                    (${formatNumber(proj.low)} - ${formatNumber(proj.high)})
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Downside Risk */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                    <Warning size={14} className="text-[var(--warning)]" />
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide">
                        Downside Scenarios
                    </span>
                </div>
                <div className="space-y-2">
                    {downsideRisk.map((risk) => (
                        <div key={risk.label} className="flex items-center justify-between p-3 rounded-lg bg-black/20">
                            <span className="text-xs text-[var(--text-secondary)]">
                                {risk.label} ({risk.dropPercent}% drop)
                            </span>
                            <span className={`text-sm font-bold ${risk.loss > 0 ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
                                {risk.loss > 0 ? `-$${formatNumber(risk.loss)}` : "✓ Covered"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <Info size={14} className="text-[var(--text-tertiary)] mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-[var(--text-tertiary)] leading-relaxed">
                    Projections are estimates based on historical volatility. Actual yields are variable and not guaranteed.
                    Past performance does not indicate future results.
                </p>
            </div>
        </div>
    );
}
