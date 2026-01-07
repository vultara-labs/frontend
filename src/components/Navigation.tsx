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
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md"
        >
            <div className="mx-auto max-w-[1280px] px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 text-primary group-hover:border-primary/50 transition-colors">
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
                    <a href="#features" className="text-sm font-medium text-gray-400 hover:text-primary transition-colors">Product</a>
                    <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-primary transition-colors">Yield</a>
                    <a href="#" className="text-sm font-medium text-gray-400 hover:text-primary transition-colors">Security</a>
                    <a href="#about" className="text-sm font-medium text-gray-400 hover:text-primary transition-colors">Company</a>
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <a href="#" className="hidden sm:block text-sm font-medium text-white hover:text-primary transition-colors">Log In</a>
                    <button className="bg-primary hover:bg-[#b3e600] text-black text-sm font-bold px-5 py-2.5 rounded-md transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)]">
                        Launch App
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2"
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
                    className="md:hidden glass-panel border-t border-white/5 p-4 mx-4 mt-2 rounded-xl"
                >
                    <div className="flex flex-col gap-4">
                        <a href="#features" className="text-gray-400 hover:text-white">Product</a>
                        <a href="#how-it-works" className="text-gray-400 hover:text-white">Yield</a>
                        <a href="#about" className="text-gray-400 hover:text-white">Security</a>
                        <button className="bg-primary text-black font-bold py-3 rounded-md mt-2">
                            Launch App
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
