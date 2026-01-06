"use client";

import { motion } from "framer-motion";
import { Github, Twitter, ExternalLink } from "lucide-react";

export default function Footer() {
    return (
        <footer id="about" className="relative py-20 lg:py-24">
            {/* Top Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Social Proof Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="glass-card inline-block px-8 py-6 mb-8">
                        <div className="text-sm text-[#94A3B8] mb-2">🏆 Built for</div>
                        <div className="text-xl font-bold text-white">
                            Base Indonesia Hackathon 2025
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 text-[#64748B]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                                <span className="text-lg">🔵</span>
                            </div>
                            <span className="font-medium">Powered by Base</span>
                        </div>
                        <div className="w-px h-8 bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center">
                                <span className="text-lg">🥜</span>
                            </div>
                            <span className="font-medium">Yield by Thetanuts</span>
                        </div>
                        <div className="w-px h-8 bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                                <span className="text-lg">🪙</span>
                            </div>
                            <span className="font-medium">Off-ramp via IDRX</span>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Content */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <a href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center">
                                <span className="text-[#0A0A0A] font-bold text-xl">V</span>
                            </div>
                            <span className="text-xl font-semibold text-white">
                                Vultara<span className="text-[#64748B]"> Labs</span>
                            </span>
                        </a>
                        <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                            Secure Your Income, Amplify Your Growth. The smart USDC vault for Indonesian Web3 freelancers.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-4 h-4 text-[#94A3B8]" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                            >
                                <Github className="w-4 h-4 text-[#94A3B8]" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#features" className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2">
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2">
                                    Documentation
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2">
                                    Base Network
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="https://thetanuts.finance" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2">
                                    Thetanuts Finance
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2">
                                    IDRX Stablecoin
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#64748B]">
                    <div>© 2025 Vultara Labs. All rights reserved.</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
