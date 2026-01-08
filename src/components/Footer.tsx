"use client";

import { Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="about" className="relative py-24 lg:py-32 overflow-hidden bg-[var(--obsidian-base)]">
            {/* Top Border with Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--volt)]/30 to-transparent" />

            {/* Radial Glow for Footer */}
            <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[var(--volt)]/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                {/* Footer Content */}
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-8">
                            <img src="/logo-dark.png" alt="Vultara" className="h-12 w-auto" />
                        </Link>
                        <p className="text-[var(--text-secondary)] font-light leading-loose max-w-md mb-8">
                            Secure Your Income, Amplify Your Growth. The smart USDC vault for Indonesian Web3 freelancers.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a href="#" className="w-12 h-12 rounded-xl card-solid flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-white/30 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-xl card-solid flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-white/30 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#features" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--volt)] transition-colors">Features</a></li>
                            <li><a href="#how-it-works" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--volt)] transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--volt)] transition-colors flex items-center gap-2">Documentation <ExternalLink size={12} /></a></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Ecosystem</h4>
                        <ul className="space-y-4">
                            <li><a href="https://base.org" className="text-sm text-[var(--text-tertiary)] hover:text-blue-400 transition-colors">Base Network</a></li>
                            <li><a href="https://thetanuts.finance" className="text-sm text-[var(--text-tertiary)] hover:text-amber-400 transition-colors">Thetanuts Finance</a></li>
                            <li><a href="https://idrx.co" className="text-sm text-[var(--text-tertiary)] hover:text-orange-400 transition-colors">IDRX Stablecoin</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">
                    <div>© 2025 Vultara Labs. All rights reserved.</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
