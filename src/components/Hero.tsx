"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useRef, MouseEvent, useEffect, useState } from "react";

// Counter Component for "Live" Money Feel
const Counter = ({ from, to }: { from: number; to: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const node = nodeRef.current;
        let intervalId: NodeJS.Timeout | null = null;

        const controls = animate(from, to, {
            duration: 2.5,
            ease: [0.19, 1, 0.22, 1],
            onUpdate(value) {
                if (node) node.textContent = `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            },
            onComplete() {
                if (!node) return;
                let currentValue = to;
                intervalId = setInterval(() => {
                    const increment = Math.random() * (0.05 - 0.01) + 0.01;
                    currentValue += increment;
                    node.textContent = `$${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }, 4000);
            }
        });

        return () => {
            controls.stop();
            if (intervalId) clearInterval(intervalId);
        };
    }, [from, to, isInView]);

    return <span ref={nodeRef} className="tabular-nums tracking-tight" />;
};

export default function Hero() {
    const targetRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // Scroll Logic
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
    const yParallax = useTransform(scrollYProgress, [0, 0.6], [0, 100]); // Deeper parallax

    // Mouse Tilt Logic - Refined physics
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 }); // Heavier feel
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section ref={targetRef} className="relative min-h-screen flex flex-col pt-32 pb-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-animate opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--obsidian-base)]/80 to-[var(--obsidian-base)] z-0" />

            {/* Main Content */}
            <motion.div
                style={{ opacity, scale, y: yParallax }}
                className="relative z-10 mx-auto max-w-[1280px] px-6 w-full flex-grow flex items-center"
            >
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="lg:col-span-7 flex flex-col gap-8 max-w-2xl"
                    >
                        {/* Live Badge */}
                        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/80 uppercase tracking-widest backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--volt)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--volt)]"></span>
                            </span>
                            <span>V2.0 Mainnet Live</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                            THE SALARY <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">
                                ENGINE.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-[var(--text-secondary)] font-normal leading-relaxed max-w-lg">
                            Streamline crypto payroll and earn generous yield on idle USDC. Automated financial infrastructure for the open economy.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <Link href="/dashboard" className="h-12 px-8 flex items-center gap-3 btn-primary group">
                                <span className="relative z-10">Start Earning</span>
                                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                className="h-12 px-8 flex items-center gap-3 btn-secondary group"
                                aria-label="Watch how it works video"
                                onClick={() => setShowVideoModal(true)}
                            >
                                <PlayCircle size={20} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                                <span>How it works</span>
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-6 sm:items-center">
                            <span className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">Audited & Trusted By</span>
                            <div className="flex gap-4 items-center">
                                {/* CertiK */}
                                <a href="https://www.certik.com" target="_blank" rel="noopener noreferrer" className="h-10 px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-[#00D4AA]/30 hover:bg-[#00D4AA]/5 transition-all duration-300 opacity-70 hover:opacity-100 group">
                                    <img src="/logos/certik.png" alt="CertiK" className="h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                                </a>

                                {/* Hacken */}
                                <a href="https://hacken.io" target="_blank" rel="noopener noreferrer" className="h-9 px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-[#30E3CA]/30 hover:bg-[#30E3CA]/5 transition-all duration-300 opacity-70 hover:opacity-100 group">
                                    <img src="/logos/hacken.svg" alt="Hacken" className="h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                                </a>

                                {/* OpenZeppelin */}
                                <a href="https://www.openzeppelin.com" target="_blank" rel="noopener noreferrer" className="h-9 px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-[#4E5EE4]/30 hover:bg-[#4E5EE4]/5 transition-all duration-300 opacity-70 hover:opacity-100 group">
                                    <img src="/logos/openzeppelin.svg" alt="OpenZeppelin" className="h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content: 3D Kinetic Card */}
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="lg:col-span-5 relative perspective-1000 w-full flex justify-center lg:justify-end py-10"
                    >
                        {/* Glow Behind */}
                        <motion.div
                            style={{ rotateX, rotateY }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--volt)] opacity-20 blur-[120px] rounded-full pointer-events-none will-change-transform"
                        />

                        {/* Main Card */}
                        <motion.div
                            ref={cardRef}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                            className="card-solid w-full max-w-md rounded-[2rem] p-8 relative bg-[var(--obsidian-surface)] will-change-transform"
                        >

                            {/* Card Content Layer */}
                            <motion.div style={{ z: 30 }} className="transform-style-3d">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_20px_rgba(39,117,202,0.4)] ring-1 ring-white/5">
                                            <img src="/logos/usdc.svg" alt="USDC" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg uppercase tracking-wider">USDC Vault</h3>
                                            <div className="flex items-center gap-2 text-[9px] text-[var(--volt)] font-bold uppercase tracking-widest bg-[var(--volt-glass)] px-2 py-0.5 rounded-full w-fit mt-1 border border-[var(--volt)]/10">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--volt)] animate-pulse" />
                                                Active Strategy
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-[var(--text-tertiary)] hover:text-white transition-colors"
                                        aria-label="More options"
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                {/* Balance */}
                                <div className="mb-8">
                                    <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest mb-2">Total Balance</p>
                                    <h2 className="text-5xl font-bold text-white tracking-tighter tabular-nums">
                                        <Counter from={100000} to={124592.50} />
                                    </h2>
                                </div>

                                {/* Graph - Animated */}
                                <div className="relative h-24 w-full mb-8">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.15" />
                                                <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0,100 L0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5 L300,100 Z" fill="url(#chartGradient)" className="animate-[fadeIn_1.5s_ease-out_0.5s_both]" />
                                        <path
                                            className="drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                                            d="M0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5"
                                            fill="none"
                                            stroke="#CCFF00"
                                            strokeLinecap="round"
                                            strokeWidth="3"
                                            strokeDasharray="500"
                                            strokeDashoffset="500"
                                            style={{ animation: 'drawLine 2s ease-out 0.3s forwards' }}
                                        />
                                        <circle cx="300" cy="5" r="5" fill="#0A0A0A" stroke="#CCFF00" strokeWidth="3" className="drop-shadow-[0_0_10px_#CCFF00] animate-[fadeIn_0.3s_ease-out_2s_both]" />
                                    </svg>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default">
                                        <p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">APY</p>
                                        <p className="text-2xl font-bold text-[var(--volt)] tracking-tighter">4.5%</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default">
                                        <p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Next Payout</p>
                                        <p className="text-2xl font-bold text-white tabular-nums tracking-tighter">4h 12m</p>
                                    </div>
                                </div>

                                {/* Earnings Indicator - Integrated */}
                                <div className="mt-6 pt-5 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[var(--volt)]/10 flex items-center justify-center">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--volt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                                    <polyline points="17 6 23 6 23 12"></polyline>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">Total Yield Earned</p>
                                            </div>
                                        </div>
                                        <p className="text-[var(--volt)] font-bold tracking-tight text-lg">+$1,240.50</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* How it Works Video Modal */}
            <AnimatePresence>
                {showVideoModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowVideoModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-4xl aspect-video bg-[var(--obsidian-surface)] rounded-2xl border border-[var(--border-medium)] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowVideoModal(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-[var(--border-subtle)] flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Video Placeholder */}
                            <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8">
                                <div className="w-20 h-20 rounded-full bg-[var(--volt)]/10 border border-[var(--volt)]/20 flex items-center justify-center">
                                    <PlayCircle size={40} className="text-[var(--volt)]" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-2">Video Coming Soon</h3>
                                    <p className="text-[var(--text-secondary)] max-w-md">
                                        We're creating an amazing explainer video to show you how Vultara works. Stay tuned!
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowVideoModal(false)}
                                    className="px-6 py-3 bg-white/5 border border-[var(--border-medium)] rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
