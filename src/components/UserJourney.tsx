"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Wallet, ArrowDownToLine, TrendingUp, ArrowUpFromLine } from "lucide-react";
import { Alien } from "@phosphor-icons/react";
import { useRef } from "react";
import { TECH_STATS } from "@/constants";

const JOURNEY_ICONS = [Wallet, ArrowDownToLine, TrendingUp, Alien, ArrowUpFromLine];

const steps = [
    { title: "Connect Wallet", desc: "Link your wallet in seconds. MetaMask, Coinbase, or any WalletConnect compatible wallet." },
    { title: "Deposit USDC", desc: "Transfer USDC to the Vultara vault. Minimum deposit: $10 USDC." },
    { title: "Earn Yield", desc: "Your USDC is deployed to Thetanuts strategies. Watch your balance grow in real-time." },
    { title: "Ask Nova", desc: "Get personalized insights from our AI advisor. Understand risks, strategies, and optimize returns." },
    { title: "Withdraw Anytime", desc: "No lock-ups. Withdraw your USDC plus earned yield whenever you want." },
];

export default function UserJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const lineHeight = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);
    const lineWidth = useTransform(scrollYProgress, [0, 0.7], ["0%", "100%"]);

    return (
        <section id="how-it-works" ref={containerRef} className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-grid-animate opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--obsidian-base)] via-transparent to-[var(--obsidian-base)]" />

            <div className="mx-auto max-w-[1280px] relative z-10">
                <div className="mb-12 md:mb-16 lg:mb-24 max-w-3xl">
                    <h2 className="mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                        START <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--volt)] via-white to-[var(--volt)] bg-[length:200%_auto] animate-gradient">IN MINUTES</span>
                    </h2>
                    <p className="max-w-xl text-[15px] sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                        From wallet connect to real yield—streamlined for speed and simplicity.
                    </p>
                </div>

                <div className="relative w-full mb-12 lg:mb-16">
                    <div className="hidden lg:block absolute top-[48px] left-0 w-full h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
                        <motion.div
                            style={{ width: lineWidth }}
                            className="h-full bg-gradient-to-r from-[var(--volt)] via-white to-[var(--volt)] opacity-70 shadow-[0_0_20px_#CCFF00]"
                        />
                    </div>

                    <div className="lg:hidden absolute left-[39px] top-0 bottom-0 w-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-[var(--volt)] via-white to-[var(--volt)] opacity-70 shadow-[0_0_20px_#CCFF00]"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
                        {steps.map((step, idx) => {
                            const StepIcon = JOURNEY_ICONS[idx];
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative flex lg:flex-col flex-row gap-6 lg:gap-0 items-start"
                                >
                                    <div className="mb-0 lg:mb-10 flex flex-shrink-0 justify-center lg:justify-start">
                                        <div
                                            className={`w-16 h-16 lg:w-24 lg:h-24 rounded-[1.25rem] lg:rounded-[1.5rem] bg-[var(--obsidian-surface)] border flex items-center justify-center transition-all duration-500 relative z-10 ${idx === 0
                                                ? "border-[var(--volt)] text-[var(--volt)] shadow-[0_0_40px_-10px_rgba(204,255,0,0.3)]"
                                                : "border-[var(--border-medium)] text-[var(--text-tertiary)] group-hover:border-[var(--volt)]/50 group-hover:text-[var(--volt)] group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(204,255,0,0.2)]"
                                                } `}
                                        >
                                            <StepIcon size={28} className="lg:w-9 lg:h-9" />
                                        </div>
                                    </div>

                                    <div className="text-left pt-1 lg:pt-0">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 lg:mb-3 block ${idx === 0 ? "text-[var(--volt)]" : "text-[var(--text-tertiary)] group-hover:text-[var(--volt)] transition-colors"}`}>
                                            Step 0{idx + 1}
                                        </span>
                                        <h3 className="text-white font-bold text-lg lg:text-xl mb-2 lg:mb-3 uppercase tracking-tight">{step.title}</h3>
                                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">{step.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 card-solid rounded-xl lg:rounded-[2rem] divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)] overflow-hidden border border-[var(--border-subtle)]">
                    {TECH_STATS.map((stat, i) => (
                        <div key={i} className="p-6 lg:p-10 flex flex-col items-center justify-center text-center gap-2 lg:gap-3 hover:bg-white/[0.02] transition-colors cursor-default group">
                            <span className="text-[var(--volt)] text-2xl lg:text-4xl font-bold tracking-tighter group-hover:scale-110 transition-transform duration-500">{stat.val}</span>
                            <span className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
