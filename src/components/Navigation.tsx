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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto max-w-7xl px-6 py-4">
                <nav className="flex items-center justify-between glass-card px-6 py-3">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center">
                            <span className="text-[#0A0A0A] font-bold text-xl">V</span>
                        </div>
                        <span className="text-xl font-semibold text-white">
                            Vultara<span className="text-[#64748B]"> Labs</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                            How It Works
                        </a>
                        <a href="#about" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                            About
                        </a>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <button className="btn-primary text-sm">
                            Launch App
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-2 glass-card p-4"
                    >
                        <div className="flex flex-col gap-4">
                            <a href="#features" className="text-[#94A3B8] hover:text-white transition-colors">
                                Features
                            </a>
                            <a href="#how-it-works" className="text-[#94A3B8] hover:text-white transition-colors">
                                How It Works
                            </a>
                            <a href="#about" className="text-[#94A3B8] hover:text-white transition-colors">
                                About
                            </a>
                            <button className="btn-primary text-sm mt-2">
                                Launch App
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
}
