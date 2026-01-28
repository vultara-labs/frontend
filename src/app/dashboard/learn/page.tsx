"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, ShieldCheck, Coin, Lightning, Info, Question } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function LearnPage() {
    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[var(--volt)]/10 border border-[var(--volt)]/20 text-[var(--volt)] text-xs font-bold uppercase tracking-widest">
                        <BookOpen size={14} weight="fill" />
                        Vultara Academy
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
                        How Vultara Works
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                        Learn how our automated strategy generates yield and understand the weekly epoch cycle.
                    </p>
                </motion.header>

                {/* The Weekly Cycle Visualization */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="p-6 sm:p-8 rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-medium)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--volt)]/5 blur-[120px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-[var(--volt)]/10 text-[var(--volt)] flex items-center justify-center border border-[var(--volt)]/20">
                                <Clock size={20} weight="fill" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase">The Weekly Epoch Cycle</h2>
                                <p className="text-sm text-[var(--text-secondary)]">Vultara operates on a strict weekly schedule powered by Thetanuts V4.</p>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-7 gap-4">

                            {/* Friday - The Critical Day */}
                            <div className="md:col-span-2 p-5 rounded-2xl bg-[var(--volt)]/5 border border-[var(--volt)]/20 relative group">
                                <div className="absolute top-3 right-3 text-[var(--text-tertiary)] text-xs font-bold uppercase tracking-widest">Friday</div>
                                <h3 className="text-lg font-black text-[var(--volt)] uppercase mb-4">Action Day</h3>

                                <div className="space-y-4">
                                    <div className="relative pl-4 border-l-2 border-[var(--volt)]/30">
                                        <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[var(--volt)] shadow-[0_0_10px_var(--volt)]" />
                                        <p className="text-xs font-bold text-white mb-0.5">08:00 UTC</p>
                                        <p className="text-sm text-[var(--text-secondary)]">Previous Epoch Expires</p>
                                        <p className="text-xs text-[var(--text-tertiary)] mt-1">Funds unlocked & Withdrawals processed.</p>
                                    </div>

                                    <div className="relative pl-4 border-l-2 border-[var(--volt)]/30">
                                        <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[var(--volt)]" />
                                        <p className="text-xs font-bold text-white mb-0.5">10:00 UTC</p>
                                        <p className="text-sm text-[var(--text-secondary)]">New Strategy Executed</p>
                                        <p className="text-xs text-[var(--text-tertiary)] mt-1">Funds locked into new options.</p>
                                    </div>
                                </div>
                            </div>

                            {/* The Waiting Period */}
                            <div className="md:col-span-5 p-5 rounded-2xl bg-white/[0.02] border border-[var(--border-subtle)] flex flex-col justify-center">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-white uppercase">Holding Period</h3>
                                    <div className="flex gap-1">
                                        {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map(day => (
                                            <div key={day} className="px-3 py-1 rounded bg-white/[0.05] text-xs font-bold text-[var(--text-secondary)]">{day}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                                        <ShieldCheck size={24} className="text-[var(--success)] mx-auto mb-2" />
                                        <p className="text-xs font-bold text-white mb-1">Funds Secured</p>
                                        <p className="text-[10px] text-[var(--text-tertiary)]">Locked in Smart Contract</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                                        <Coin size={24} className="text-[var(--warning)] mx-auto mb-2" />
                                        <p className="text-xs font-bold text-white mb-1">Premiums Earned</p>
                                        <p className="text-[10px] text-[var(--text-tertiary)]">Accruing over time</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center">
                                        <Lightning size={24} className="text-[var(--volt)] mx-auto mb-2" />
                                        <p className="text-xs font-bold text-white mb-1">Auto-Compounding</p>
                                        <p className="text-[10px] text-[var(--text-tertiary)]">Reinvested next Friday</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.section>

                {/* FAQ / Explainer */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div className="p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)]">
                        <div className="flex items-center gap-3 mb-4">
                            <Info size={20} className="text-[var(--text-secondary)]" weight="duotone" />
                            <h3 className="text-lg font-bold text-white">Strategy Mechanics</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-[var(--volt)] font-black text-lg">01</span>
                                <div>
                                    <p className="text-sm font-bold text-white mb-1">We sell Covered Calls</p>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        Vultara sells "Out of the Money" call options on your ETH. This means we bet ETH won't skyrocket past a certain high price (Strike Price).
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[var(--volt)] font-black text-lg">02</span>
                                <div>
                                    <p className="text-sm font-bold text-white mb-1">You earn Instant Premium</p>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        Buyers pay us a premium upfront for these options. This premium is your yield.
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-[var(--volt)] font-black text-lg">03</span>
                                <div>
                                    <p className="text-sm font-bold text-white mb-1">Best Case Scenario</p>
                                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                        If ETH stays below the Strike Price by Friday, we keep 100% of your ETH + the Premium.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)]">
                        <div className="flex items-center gap-3 mb-4">
                            <Question size={20} className="text-[var(--text-secondary)]" weight="duotone" />
                            <h3 className="text-lg font-bold text-white">Common Questions</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                <p className="text-xs font-bold text-white mb-1">Can I withdraw anytime?</p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                    You can <strong>schedule</strong> a withdrawal anytime. However, funds only leave the vault on <strong>Fridays</strong> (Epoch Expiry) when they are unlocked from the strategy.
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                <p className="text-xs font-bold text-white mb-1">Is there a lock-up period?</p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                    Yes, 1 week (maximum). If you deposit on Wednesday, funds are locked until Friday expiry.
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                <p className="text-xs font-bold text-white mb-1">What are the risks?</p>
                                <p className="text-xs text-[var(--text-secondary)]">
                                    If ETH price explodes above the Strike Price, your gains are capped at that price. You still profit, but less than holding pure ETH.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center"
                >
                    <Link href="/dashboard/deposit" className="btn-primary h-14 px-8 flex items-center gap-2 text-sm uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(204,255,0,0.15)]">
                        Start Earning
                        <ArrowRight size={16} weight="bold" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
