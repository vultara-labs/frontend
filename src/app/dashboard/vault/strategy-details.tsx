"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendUp, ShieldCheck, Clock, ChartLineUp, ArrowRight, CaretDown, CaretUp, Lightning, Info } from "@phosphor-icons/react";

interface VaultStrategyDetailsProps {
    showDetails: boolean;
    setShowDetails: (show: boolean) => void;
    displayedStrikePrice: number;
}

export function VaultStrategyDetails({ showDetails, setShowDetails, displayedStrikePrice }: VaultStrategyDetailsProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] hover:bg-white/[0.04] transition-colors text-left group"
            >
                <div className="flex items-center gap-2">
                    <Info size={16} className="text-[var(--text-tertiary)]" />
                    <span className="text-sm font-medium text-[var(--text-secondary)]">Strategy Details & Risks</span>
                </div>
                {showDetails ? (
                    <CaretUp size={16} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                ) : (
                    <CaretDown size={16} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                )}
            </button>

            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 sm:p-8 mt-3 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] space-y-6">

                            {/* Strategy Visual Flow */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-[var(--volt)]/10 border border-[var(--volt)]/20 flex items-center justify-center">
                                        <Lightning size={16} className="text-[var(--volt)]" weight="fill" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">Covered Call Strategy</h4>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { step: 1, title: "You Deposit", desc: "ETH goes into vault", color: "info" },
                                        { step: 2, title: "Vault Sells Calls", desc: `Strike: $${displayedStrikePrice.toLocaleString("en-US")}`, color: "volt" },
                                        { step: 3, title: "Collect Premium", desc: "Weekly earnings", color: "success" },
                                        { step: 4, title: "Auto-Compound", desc: "Reinvest gains", color: "warning" },
                                    ].map((item) => (
                                        <div key={item.step} className="relative p-4 rounded-xl bg-white/[0.03] border border-[var(--border-subtle)] text-center hover:bg-white/[0.05] transition-colors">
                                            <div className={`w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center text-sm font-bold ${item.color === 'info' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                item.color === 'volt' ? 'bg-[var(--volt)]/10 text-[var(--volt)] border border-[var(--volt)]/20' :
                                                    item.color === 'success' ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20' :
                                                        'bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20'
                                                }`}>
                                                {item.step}
                                            </div>
                                            <p className="text-xs font-bold text-white mb-1">{item.title}</p>
                                            <p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* What is a Covered Call? */}
                            <div className="p-4 sm:p-5 rounded-xl bg-[var(--volt)]/5 border border-[var(--volt)]/20">
                                <h5 className="label text-[var(--volt)] mb-2">What is a Covered Call?</h5>
                                <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                                    A <span className="text-white font-medium">covered call</span> is when you own an asset (ETH) and sell someone the <em>right</em> to buy it at a higher price (strike price).
                                    You collect a <span className="text-[var(--volt)] font-medium">premium</span> upfront. If ETH stays below the strike, you keep both your ETH and the premium.
                                    If ETH goes above the strike, your gains are capped but you still profit.
                                </p>
                            </div>

                            {/* Epoch Cycle */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock size={16} className="text-[var(--warning)]" />
                                    <h4 className="text-sm font-bold text-white">Weekly Epoch Cycle</h4>
                                </div>
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {["Epoch Starts", "Options Sold", "Holding Period", "Epoch Expiry", "Premium Collected"].map((step, i) => (
                                        <div key={i} className="flex items-center gap-2 shrink-0">
                                            <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] whitespace-nowrap font-medium">
                                                {step}
                                            </div>
                                            {i < 4 && <ArrowRight size={10} className="text-[var(--text-tertiary)]" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Outcomes Grid */}
                            <div>
                                <h4 className="text-sm font-bold text-white mb-3">Possible Outcomes</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-[var(--success)]/5 border border-[var(--success)]/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendUp size={16} className="text-[var(--success)]" weight="fill" />
                                            <span className="label text-[var(--success)]">Best Case</span>
                                        </div>
                                        <p className="text-body-sm text-[var(--text-secondary)]">
                                            ETH stays below strike → Keep 100% of ETH + Premium earned.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[var(--warning)]/5 border border-[var(--warning)]/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ChartLineUp size={16} className="text-[var(--warning)]" weight="fill" />
                                            <span className="label text-[var(--warning)]">ETH Moons</span>
                                        </div>
                                        <p className="text-body-sm text-[var(--text-secondary)]">
                                            ETH goes above strike → Gains capped, but still profitable.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Risks */}
                            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)]">
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldCheck size={14} className="text-[var(--text-tertiary)]" weight="fill" />
                                    <span className="label text-[var(--text-secondary)]">Risks to Understand</span>
                                </div>
                                <ul className="space-y-2 text-body-sm text-[var(--text-secondary)]">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-2 shrink-0" />
                                        <span><strong className="text-white">APY is Variable</strong> — Depends on market volatility.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-2 shrink-0" />
                                        <span><strong className="text-white">Capped Upside</strong> — Gains limited to strike price.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-2 shrink-0" />
                                        <span><strong className="text-white">Smart Contract Risk</strong> — Mitigated by audits.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
