"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#CCFF00] opacity-[0.03] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#CCFF00] opacity-[0.02] rounded-full blur-[100px]" />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-[#CCFF00]" />
                            <span className="text-sm text-[#94A3B8]">Built for Base Indonesia Hackathon 2025</span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                            <span className="text-white">Secure Your Income,</span>
                            <br />
                            <span className="gradient-text">Amplify Your Growth.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-[#94A3B8] mb-8 max-w-lg leading-relaxed">
                            The smart USDC vault designed for Indonesian Web3 freelancers.
                            Earn organic yield through Thetanuts V3 while your AI advisor
                            optimizes every decision.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            <button className="btn-primary flex items-center gap-2">
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button className="btn-secondary flex items-center gap-2">
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <div className="text-2xl font-bold text-white">12.5%</div>
                                <div className="text-sm text-[#64748B]">Avg. APY</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">$0</div>
                                <div className="text-sm text-[#64748B]">Gas Fees</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">1-Click</div>
                                <div className="text-sm text-[#64748B]">IDRX Withdraw</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Dashboard Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        {/* Main Dashboard Card */}
                        <div className="glass-card gradient-border p-8 neon-glow">
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CCFF00] to-[#A3CC00] flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-[#0A0A0A]" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-[#64748B]">Smart Vault</div>
                                        <div className="text-white font-medium">Protected by Shieldie</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20">
                                    <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                                    <span className="text-xs text-[#CCFF00]">Live</span>
                                </div>
                            </div>

                            {/* Balance */}
                            <div className="mb-8">
                                <div className="text-sm text-[#64748B] mb-2">Total Balance</div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-bold text-white">$12,847.50</span>
                                    <span className="text-lg text-[#64748B]">USDC</span>
                                </div>
                            </div>

                            {/* Yield Chart Simulation */}
                            <div className="glass-card p-4 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-[#64748B]">Weekly Yield</span>
                                    <div className="flex items-center gap-1 text-[#CCFF00]">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-semibold">+12.5%</span>
                                    </div>
                                </div>

                                {/* Chart Bars */}
                                <div className="flex items-end gap-2 h-20">
                                    {[40, 55, 45, 65, 50, 75, 85].map((height, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                                            className="flex-1 rounded-t-md bg-gradient-to-t from-[#CCFF00]/20 to-[#CCFF00]/60"
                                            style={{ boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)' }}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-[#64748B]">
                                    <span>Mon</span>
                                    <span>Tue</span>
                                    <span>Wed</span>
                                    <span>Thu</span>
                                    <span>Fri</span>
                                    <span>Sat</span>
                                    <span>Sun</span>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="btn-primary py-3 text-sm">
                                    Deposit
                                </button>
                                <button className="btn-secondary py-3 text-sm">
                                    Withdraw to IDR
                                </button>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute -top-4 -right-4 glass-card px-4 py-2 flex items-center gap-2"
                        >
                            <div className="w-6 h-6 rounded-full bg-[#CCFF00] flex items-center justify-center">
                                <span className="text-xs font-bold text-[#0A0A0A]">⚡</span>
                            </div>
                            <span className="text-sm text-white">Gasless TX</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 }}
                            className="absolute -bottom-4 -left-4 glass-card px-4 py-2 flex items-center gap-2"
                        >
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <span className="text-xs">🔐</span>
                            </div>
                            <span className="text-sm text-white">Passkey Login</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
