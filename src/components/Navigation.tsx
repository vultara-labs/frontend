"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[var(--obsidian-base)]/80 backdrop-blur-xl"
        >
            <div className="mx-auto max-w-[1280px] px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-[var(--volt)] group-hover:border-[var(--volt)]/50 group-hover:bg-[var(--volt-glass)] transition-all duration-300">
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4L11 20" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                            <path d="M11 20L18 4L14 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            <path d="M18 4L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase">Vultara</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {['Product', 'Yield', 'Security', 'Company'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors tracking-wide uppercase text-[11px]">
                            {item}
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-6">
                    <a href="#" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-white hover:text-[var(--volt)] transition-colors">
                        Log In
                    </a>
                    <button className="btn-primary px-6 py-2.5 text-xs font-bold tracking-widest">
                        Launch App
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2 hover:text-[var(--volt)] transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden glass-panel border-t border-white/5 p-6 mx-4 mt-2 rounded-2xl"
                >
                    <div className="flex flex-col gap-6">
                        {['Product', 'Yield', 'Security', 'Company'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[var(--text-secondary)] hover:text-white text-lg font-bold tracking-tight">
                                {item}
                            </a>
                        ))}
                        <button className="btn-primary w-full py-4 rounded-xl mt-4">
                            Launch App
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
