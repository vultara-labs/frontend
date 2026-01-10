"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LANDING_NAV_ITEMS } from "@/constants";

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--obsidian-base)]/80 backdrop-blur-xl"
        >
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/logo-dark.png" alt="Vultara" className="h-10 w-auto" />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {LANDING_NAV_ITEMS.map((item) => (
                        <a key={item.label} href={item.href} className="text-sm font-bold text-[var(--text-secondary)] hover:text-white transition-colors tracking-widest uppercase">
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="hidden sm:block text-sm font-bold uppercase tracking-widest text-white hover:text-[var(--volt)] transition-colors">
                        Log In
                    </Link>
                    <Link href="/dashboard" className="btn-primary px-8 py-3 text-sm font-bold tracking-widest">
                        Launch App
                    </Link>

                    <button
                        className="md:hidden text-white p-2 hover:text-[var(--volt)] transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden glass-panel border-t border-[var(--border-subtle)] p-6 mx-4 mt-2 rounded-2xl"
                >
                    <div className="flex flex-col gap-5">
                        {LANDING_NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[var(--text-secondary)] hover:text-white text-lg font-bold tracking-tight"
                            >
                                {item.label}
                            </a>
                        ))}
                        <Link href="/dashboard" className="btn-primary w-full py-4 rounded-xl mt-4 flex items-center justify-center">
                            Launch App
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
