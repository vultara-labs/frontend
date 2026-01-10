"use client";

import { Github, Twitter, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FOOTER_PRODUCT_LINKS, FOOTER_ECOSYSTEM_LINKS } from "@/constants";

export default function Footer() {
    return (
        <footer id="about" className="relative py-24 lg:py-32 overflow-hidden bg-[var(--obsidian-base)]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--volt)]/30 to-transparent" />
            <div className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[var(--volt)]/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 mb-12 lg:mb-20">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-8">
                            <img src="/logo-dark.png" alt="Vultara" className="h-12 w-auto" />
                        </Link>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mb-8">
                            Simple DeFi yield for everyone. Deposit USDC, earn real returns from Thetanuts strategies.
                        </p>
                        <div className="flex gap-3">
                            <button className="w-12 h-12 rounded-xl card-solid flex items-center justify-center text-[var(--text-tertiary)] cursor-not-allowed opacity-50" aria-label="Twitter - Coming Soon" title="Coming Soon">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <a href="https://github.com/vultara-labs" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl card-solid flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-bright)] transition-all" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4">
                            {FOOTER_PRODUCT_LINKS.map((link) => {
                                const hasSoon = "soon" in link && link.soon;
                                return (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className={`text-sm text-[var(--text-tertiary)] hover:text-[var(--volt)] transition-colors flex items-center gap-2 ${hasSoon ? "cursor-not-allowed opacity-50" : ""}`}
                                        >
                                            {link.label}
                                            {hasSoon && <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded">SOON</span>}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Ecosystem</h4>
                        <ul className="space-y-4">
                            {FOOTER_ECOSYSTEM_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-sm text-[var(--text-tertiary)] hover:text-${link.color} transition-colors flex items-center gap-2`}
                                    >
                                        {link.label} <ExternalLink size={12} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 lg:pt-10 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4 lg:gap-6 text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">
                    <div>© 2026 Vultara Labs. All rights reserved.</div>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
