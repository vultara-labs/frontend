"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { ArrowRight, PlayCircle, MoreHorizontal } from "lucide-react";
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
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

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
        <section ref={targetRef} className="relative min-h-screen flex flex-col pt-36 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-animate opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--obsidian-base)]/80 to-[var(--obsidian-base)] z-0" />

            {/* Main Content */}
            <motion.div
                style={isDesktop ? { opacity, scale, y: yParallax } : {}}
                className="relative z-10 mx-auto max-w-[1280px] px-6 w-full flex-grow flex items-center"
            >
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                    {/* Left Content */}
                    {/* Left Content */}
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="lg:col-span-7 flex flex-col min-h-[85dvh] lg:min-h-0 justify-center lg:justify-start gap-8 lg:gap-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left py-12 lg:py-0 relative"
                    >
                        {/* Mobile Ambient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[var(--volt)]/20 blur-[80px] rounded-full lg:hidden pointer-events-none animate-pulse-slow" />

                        <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 relative z-10">
                            {/* Status Badge */}
                            <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-3 py-1.5 text-[10px] font-bold text-[var(--warning)] uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(255,170,0,0.1)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--warning)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--warning)]"></span>
                                </span>
                                <span>Testnet Beta</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                                THE SALARY <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--volt)] via-white to-[var(--volt)] bg-[length:200%_auto] animate-gradient">
                                    ENGINE.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-[15px] sm:text-base lg:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xs sm:max-w-lg mx-auto lg:mx-0">
                                Streamline crypto payroll and earn generous yield on idle USDC. Automated financial infrastructure for the open economy.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 lg:mt-4 w-full sm:w-auto px-4 sm:px-0">
                                <Link href="/dashboard" className="h-11 lg:h-12 px-6 lg:px-8 w-full sm:w-auto flex items-center justify-center gap-2 btn-primary group shadow-[0_0_20px_rgba(204,255,0,0.15)] text-sm lg:text-base font-bold tracking-wide">
                                    <span className="relative z-10">Start Earning</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button
                                    className="h-11 lg:h-12 px-6 lg:px-8 w-full sm:w-auto flex items-center justify-center gap-2 btn-secondary group text-sm lg:text-base font-bold tracking-wide"
                                    aria-label="Learn how Vultara works"
                                    onClick={() => {
                                        document.querySelector('#how-it-works')?.scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }}
                                >
                                    <PlayCircle size={18} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                                    <span>How it works</span>
                                </button>
                            </div>
                        </div>

                        {/* Social Proof & Scroll Hint */}
                        <div className="pt-8 lg:pt-10 border-t border-white/5 flex flex-col justify-end items-center lg:items-start lg:justify-start gap-6 lg:gap-6 mt-auto lg:mt-0 relative z-10">

                            {/* Logos */}
                            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center w-full lg:w-auto">
                                <span className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest text-center lg:text-left w-full lg:w-auto">Audited & Trusted By</span>
                                <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center items-center">
                                    <a href="https://www.certik.com" target="_blank" rel="noopener noreferrer" className="h-8 lg:h-10 px-3 lg:px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-[#00D4AA]/30 hover:bg-[#00D4AA]/5 transition-all duration-300 opacity-70 hover:opacity-100 group">
                                        <img src="/logos/certik.png" alt="CertiK" className="h-4 lg:h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                    <a href="https://hacken.io" target="_blank" rel="noopener noreferrer" className="h-7 lg:h-9 px-3 lg:px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-[#30E3CA]/30 hover:bg-[#30E3CA]/5 transition-all duration-300 opacity-70 hover:opacity-100 group">
                                        <img src="/logos/hacken.svg" alt="Hacken" className="h-4 lg:h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                    <a href="https://www.openzeppelin.com" target="_blank" rel="noopener noreferrer" className="h-7 lg:h-9 px-3 lg:px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-[#4E5EE4]/30 hover:bg-[#4E5EE4]/5 transition-all duration-300 opacity-70 hover:opacity-100 group">
                                        <img src="/logos/openzeppelin.svg" alt="OpenZeppelin" className="h-4 lg:h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </div>
                            </div>

                            {/* Scroll Indicator (Mobile Only) */}
                            <div className="lg:hidden flex flex-col items-center gap-2 opacity-50 animate-bounce pt-4">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content: 3D Kinetic Card */}
                    <div
                        onMouseMove={(e) => {
                            if (window.innerWidth >= 1024) handleMouseMove(e);
                        }}
                        onMouseLeave={handleMouseLeave}
                        className="lg:col-span-5 relative perspective-1000 w-full flex justify-center lg:justify-end py-10 lg:py-10 mt-6 lg:mt-0"
                    >
                        {/* Glow Behind */}
                        <motion.div
                            style={{ rotateX, rotateY }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] bg-[var(--volt)] opacity-20 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none will-change-transform"
                        />

                        {/* Main Card */}
                        <motion.div
                            ref={cardRef}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                            className="card-solid w-full max-w-[340px] sm:max-w-md rounded-[1.5rem] lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 relative bg-[var(--obsidian-surface)] will-change-transform mx-auto"
                        >

                            {/* Card Content Layer */}
                            <motion.div style={{ z: 30 }} className="transform-style-3d">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-6 lg:mb-10">
                                    <div className="flex items-center gap-3 lg:gap-4">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_20px_rgba(39,117,202,0.4)] ring-1 ring-white/5">
                                            <img src="/logos/usdc.svg" alt="USDC" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-base lg:text-lg uppercase tracking-wider">USDC Vault</h3>
                                            <div className="flex items-center gap-2 text-[8px] lg:text-[10px] text-[var(--volt)] font-bold uppercase tracking-widest bg-[var(--volt-glass)] px-2 py-0.5 rounded-full w-fit mt-1 border border-[var(--volt)]/10">
                                                <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[var(--volt)] animate-pulse" />
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
                                <div className="mb-6 lg:mb-8">
                                    <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2">Total Balance</p>
                                    <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter tabular-nums">
                                        <Counter from={100000} to={124592.50} />
                                    </h2>
                                </div>

                                {/* Graph - Animated */}
                                <div className="relative h-16 lg:h-24 w-full mb-6 lg:mb-8">
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
                                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                    <div className="p-3 lg:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default">
                                        <p className="text-[8px] lg:text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">APY</p>
                                        <p className="text-xl lg:text-2xl font-bold text-[var(--volt)] tracking-tighter">4.5%</p>
                                    </div>
                                    <div className="p-3 lg:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default">
                                        <p className="text-[8px] lg:text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Next Payout</p>
                                        <p className="text-xl lg:text-2xl font-bold text-white tabular-nums tracking-tighter">4h 12m</p>
                                    </div>
                                </div>

                                {/* Earnings Indicator - Integrated */}
                                <div className="mt-5 lg:mt-6 pt-4 lg:pt-5 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 lg:gap-3">
                                            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[var(--volt)]/10 flex items-center justify-center">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--volt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                                    <polyline points="17 6 23 6 23 12"></polyline>
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[8px] lg:text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">Total Yield Earned</p>
                                            </div>
                                        </div>
                                        <p className="text-[var(--volt)] font-bold tracking-tight text-base lg:text-lg">+$1,240.50</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
