"use client";

import { motion } from "framer-motion";
import { Github, Twitter, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer id="about" className="relative py-20 lg:py-24 overflow-hidden">
            {/* Top Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />

            {/* Radial Glow for Footer */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Footer Content */}
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <a href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                                <span className="text-[#0A0A0A] font-bold text-xl">V</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-white">
                                Vultara<span className="text-white/30">.Labs</span>
                            </span>
                        </a>
                        <p className="text-gray-400 font-light leading-relaxed max-w-md mb-6">
                            Secure Your Income, Amplify Your Growth. The smart USDC vault for Indonesian Web3 freelancers.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-xl card-prime flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl card-prime flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#features" className="text-sm text-gray-500 hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="text-sm text-gray-500 hover:text-primary transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-2">Documentation <ExternalLink size={12} /></a></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Ecosystem</h4>
                        <ul className="space-y-4">
                            <li><a href="https://base.org" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">Base Network</a></li>
                            <li><a href="https://thetanuts.finance" className="text-sm text-gray-500 hover:text-amber-400 transition-colors">Thetanuts Finance</a></li>
                            <li><a href="#" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">IDRX Stablecoin</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium uppercase tracking-wider">
                    <div>© 2025 Vultara Labs. All rights reserved.</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
