"use client";

import { motion } from "framer-motion";
import { Fingerprint, FileText, Banknote, RefreshCcw, Landmark, ArrowRight, ArrowLeft } from "lucide-react";

export default function UserJourney() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background - Unified Grid */}
            <div className="absolute inset-0 pointer-events-none bg-grid-animate opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

            <div className="max-w-[1280px] mx-auto flex flex-col gap-16 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/5">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-2">Flow Timeline</h2>
                        <p className="text-gray-400">Your earnings journey, automated in seconds.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors">
                            <ArrowLeft size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-colors">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative w-full">
                    {/* Timeline Track */}
                    <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[1px] bg-white/10" />
                    <div className="hidden lg:block absolute top-[40px] left-0 w-1/2 h-[1px] bg-gradient-to-r from-primary to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
                        {[
                            { icon: Fingerprint, title: "Passkey Login", desc: "Secure, passwordless entry using biometric authentication." },
                            { icon: FileText, title: "Contract Setup", desc: "One-click smart contract initialization." },
                            { icon: Banknote, title: "Salary Deposit", desc: "Instant settlement in stablecoins (USDC)." },
                            { icon: RefreshCcw, title: "Auto-Swap", desc: "Zero-fee automatic conversion to IDR." },
                            { icon: Landmark, title: "Rupiah Withdrawal", desc: "Direct transfer to local bank accounts." }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative flex flex-col card-prime rounded-2xl p-6 lg:bg-transparent lg:border-none lg:backdrop-filter-none lg:p-0 lg:hover:bg-transparent lg:hover:border-none lg:shadow-none bg-[#0A0A0A] lg:bg-transparent"
                            >
                                {/* Mobile/Card Style background is applied above, explicit resets for desktop layout to be cleaner if desired, OR we can stick to card style for all. Let's make them ALL card-style for consistency. */}

                                {/* Actually, for UNIFICATION, let's make them all unified Cards. */}

                                <div className="mb-4 lg:mb-6 flex justify-center">
                                    <div className={`w-20 h-20 rounded-2xl bg-[#0A0A0A] border flex items-center justify-center transition-all duration-300 relative z-10 ${idx === 0 ? 'border-primary text-primary shadow-[0_0_20px_rgba(204,255,0,0.2)]' : 'border-white/10 text-gray-500 group-hover:border-primary/50 group-hover:text-primary'} `}>
                                        <step.icon size={28} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${idx === 0 ? 'text-primary' : 'text-gray-500 group-hover:text-primary transition-colors'}`}>
                                        Step 0{idx + 1}
                                    </span>
                                    <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tech Detail Strip - Unified Card */}
                <div className="grid grid-cols-2 md:grid-cols-4 card-prime rounded-2xl divide-y md:divide-y-0 md:divide-x divide-white/5">
                    {[
                        { label: "Latency", val: "0.05s" },
                        { label: "Encryption", val: "256-bit" },
                        { label: "Uptime", val: "100%" },
                        { label: "Swap Fees", val: "0%" }
                    ].map((stat, i) => (
                        <div key={i} className="p-6 flex flex-col items-center justify-center text-center gap-1">
                            <span className="text-primary text-2xl font-bold tracking-tight">{stat.val}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
