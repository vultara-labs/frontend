"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Fingerprint, FileText, Banknote, RefreshCcw, Landmark, ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

export default function UserJourney() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    // Liquid Fill Logic
    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
    const lineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-32 px-6 relative overflow-hidden">
            {/* Background - Unified Grid */}
            <div className="absolute inset-0 pointer-events-none bg-grid-animate opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

            <div className="max-w-[1280px] mx-auto flex flex-col gap-20 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-3">Flow Timeline</h2>
                        <p className="text-[var(--foreground-muted)] text-lg leading-relaxed max-w-lg tracking-normal">Your earnings journey, automated in seconds. From login to liquidity.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all hover:scale-105 active:scale-95">
                            <ArrowLeft size={20} />
                        </button>
                        <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all hover:scale-105 active:scale-95">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative w-full">

                    {/* Desktop Horizontal Line (Liquid Fill) */}
                    <div className="hidden lg:block absolute top-[48px] left-0 w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            style={{ width: lineWidth }}
                            className="h-full bg-gradient-to-r from-primary via-white to-primary opacity-50 shadow-[0_0_20px_#CCFF00]"
                        />
                    </div>

                    {/* Mobile Vertical Line (Liquid Fill) */}
                    <div className="lg:hidden absolute left-[47px] top-0 bottom-0 w-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-primary via-white to-primary opacity-50 shadow-[0_0_20px_#CCFF00]"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4 relative">
                        {[
                            { icon: Fingerprint, title: "Passkey Login", desc: "Secure, passwordless entry using biometric authentication." },
                            { icon: FileText, title: "Contract Setup", desc: "One-click smart contract initialization." },
                            { icon: Banknote, title: "Salary Deposit", desc: "Instant settlement in stablecoins (USDC)." },
                            { icon: RefreshCcw, title: "Auto-Swap", desc: "Zero-fee automatic conversion to IDR." },
                            { icon: Landmark, title: "Rupiah Withdrawal", desc: "Direct transfer to local bank accounts." }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="group relative flex lg:flex-col flex-row gap-6 lg:gap-0 items-start"
                            >
                                <div className="mb-0 lg:mb-10 flex flex-shrink-0 justify-center lg:justify-start">
                                    <div className={`w-24 h-24 rounded-3xl bg-[#0A0A0A] border flex items-center justify-center transition-all duration-500 relative z-10 ${idx === 0 ? 'border-primary text-primary shadow-[0_0_30px_-5px_rgba(204,255,0,0.3)]' : 'border-white/10 text-zinc-500 group-hover:border-primary/50 group-hover:text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(204,255,0,0.2)]'} `}>
                                        <step.icon size={32} />
                                    </div>
                                </div>

                                <div className="text-left pt-2 lg:pt-0">
                                    <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${idx === 0 ? 'text-primary' : 'text-zinc-600 group-hover:text-primary transition-colors'}`}>
                                        Step 0{idx + 1}
                                    </span>
                                    <h3 className="text-white font-bold text-lg mb-3 uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-[var(--foreground-muted)] text-sm leading-relaxed tracking-normal">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech Detail Strip - Unified Card */}
                <div className="grid grid-cols-2 md:grid-cols-4 card-prime rounded-3xl divide-y md:divide-y-0 md:divide-x divide-white/5 overflow-hidden">
                    {[
                        { label: "Latency", val: "0.05s" },
                        { label: "Encryption", val: "256-bit" },
                        { label: "Uptime", val: "100%" },
                        { label: "Swap Fees", val: "0%" }
                    ].map((stat, i) => (
                        <div key={i} className="p-8 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/[0.02] transition-colors cursor-default group">
                            <span className="text-primary text-3xl font-bold tracking-tighter group-hover:scale-110 transition-transform duration-300">{stat.val}</span>
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest group-hover:text-white transition-colors">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
