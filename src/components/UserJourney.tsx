"use client";

import { motion } from "framer-motion";
import { Wallet, Bot, TrendingUp, ArrowRightLeft, ChevronRight } from "lucide-react";

const steps = [
    {
        icon: Wallet,
        step: "01",
        title: "Get Paid in USDC",
        description: "Receive your freelance payments directly to your Vultara wallet.",
        color: "from-blue-500 to-blue-600",
    },
    {
        icon: Bot,
        step: "02",
        title: "Shieldie Optimizes",
        description: "Your AI advisor automatically allocates funds for maximum yield.",
        color: "from-[#CCFF00] to-[#A3CC00]",
    },
    {
        icon: TrendingUp,
        step: "03",
        title: "Earn Weekly",
        description: "Watch your balance grow with organic premium from Thetanuts.",
        color: "from-emerald-500 to-emerald-600",
    },
    {
        icon: ArrowRightLeft,
        step: "04",
        title: "Withdraw to IDRX",
        description: "1-click off-ramp to your Indonesian bank or e-wallet.",
        color: "from-purple-500 to-purple-600",
    },
];

export default function UserJourney() {
    return (
        <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#CCFF00] opacity-[0.02] rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Your <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
                        From earning to growing—simplified into four seamless steps.
                    </p>
                </motion.div>

                {/* Journey Steps - Desktop */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Connection Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2">
                            <div className="h-full bg-gradient-to-r from-transparent via-[#CCFF00]/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.6 }}
                                    className="relative"
                                >
                                    {/* Step Card */}
                                    <div className="glass-card glass-card-hover p-6 text-center relative z-10">
                                        {/* Step Number */}
                                        <div className="text-xs text-[#CCFF00] font-mono mb-4">{step.step}</div>

                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                            <step.icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-white mb-3">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                                            <div className="w-6 h-6 rounded-full bg-[#0A0A0A] border border-[#CCFF00]/30 flex items-center justify-center">
                                                <ChevronRight className="w-4 h-4 text-[#CCFF00]" />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Journey Steps - Mobile */}
                <div className="lg:hidden">
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#CCFF00]/30 via-[#CCFF00]/20 to-transparent" />

                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="relative flex gap-6"
                                >
                                    {/* Icon Circle */}
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}>
                                        <step.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 glass-card p-5">
                                        <div className="text-xs text-[#CCFF00] font-mono mb-2">{step.step}</div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-[#94A3B8]">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
