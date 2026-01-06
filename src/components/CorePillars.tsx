"use client";

import { motion } from "framer-motion";
import { Vault, Bot, Fingerprint, Banknote } from "lucide-react";

const pillars = [
    {
        icon: Vault,
        title: "Smart Salary Vault",
        highlight: "Thetanuts V3 Integration",
        description: "Your USDC earns organic premium through battle-tested DeFi strategies. No complex decisions needed—just deposit and watch it grow.",
        tags: ["Organic Premium", "Auto-Compound"],
    },
    {
        icon: Bot,
        title: "Shieldie AI",
        highlight: "Your AI Advisor",
        description: "Shieldie speaks human, not technical jargon. Get personalized recommendations and portfolio insights in Bahasa Indonesia.",
        tags: ["Natural Language", "24/7 Support"],
    },
    {
        icon: Fingerprint,
        title: "Invisible UX",
        highlight: "Zero Friction",
        description: "Login with Passkey—no seed phrases to remember. All transactions are gasless, sponsored by Vultara protocol.",
        tags: ["Passkey Login", "Gasless TX"],
    },
    {
        icon: Banknote,
        title: "Instant Rupiah Bridge",
        highlight: "1-Click Off-Ramp",
        description: "Withdraw directly to your Indonesian bank account or e-wallet via IDRX. From USDC to IDR in seconds.",
        tags: ["IDRX Powered", "Bank & E-Wallet"],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export default function CorePillars() {
    return (
        <section id="features" className="relative py-24 lg:py-32">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />
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
                        The Core <span className="gradient-text">Pillars</span>
                    </h2>
                    <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
                        Everything you need to secure your Web3 income and maximize growth—all in one elegant solution.
                    </p>
                </motion.div>

                {/* Pillars Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="glass-card glass-card-hover gradient-border p-8"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center mb-6">
                                <pillar.icon className="w-7 h-7 text-[#CCFF00]" />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {pillar.title}
                            </h3>

                            {/* Highlight */}
                            <div className="text-sm text-[#CCFF00] font-medium mb-4">
                                {pillar.highlight}
                            </div>

                            {/* Description */}
                            <p className="text-[#94A3B8] leading-relaxed mb-6">
                                {pillar.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {pillar.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-[#94A3B8] border border-white/10"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
