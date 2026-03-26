"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, SignOut } from "@phosphor-icons/react";
import { DASHBOARD_NAV_ITEMS } from "@/constants";
import { SidebarNavLink } from "./sidebar-nav";

interface MobileDrawerProps {
    pathname: string;
    mobileMenuOpen: boolean;
    isConnectedSafe: boolean;
    isConnecting: boolean;
    formattedAddress: string;
    formattedBalance: string;
    onClose: () => void;
    onDisconnect: () => void;
    openWalletModal: () => void;
}

export function MobileDrawer({
    pathname,
    mobileMenuOpen,
    isConnectedSafe,
    isConnecting,
    formattedAddress,
    formattedBalance,
    onClose,
    onDisconnect,
    openWalletModal,
}: MobileDrawerProps) {
    return (
        <AnimatePresence>
            {mobileMenuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[var(--obsidian-base)] border-r border-[var(--border-subtle)] z-50 flex flex-col"
                    >
                        <div className="p-6 pb-4 border-b border-[var(--border-subtle)]">
                            <Link href="/" className="flex items-center gap-3">
                                <Image src="/logo-dark.png" alt="Vultara" width={160} height={48} style={{ width: "auto", height: "2rem" }} />
                            </Link>
                            <div className="mt-3 px-3 py-1.5 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 inline-flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--success)]">Mainnet</span>
                            </div>
                        </div>

                        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                            {DASHBOARD_NAV_ITEMS.map((item) => (
                                <SidebarNavLink key={item.href} item={item} isActive={pathname === item.href} variant="mobile" />
                            ))}
                        </nav>

                        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--obsidian-surface)]">
                            {isConnectedSafe ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--volt)] to-[var(--success)]" />
                                        <div>
                                            <p className="text-sm font-bold text-white">{formattedAddress}</p>
                                            {formattedBalance}
                                        </div>
                                    </div>
                                    <button
                                        onClick={onDisconnect}
                                        className="w-full py-3 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold uppercase tracking-widest hover:bg-white/[0.05] hover:text-white transition-all flex items-center justify-center gap-2 text-xs"
                                    >
                                        <SignOut size={16} weight="bold" />
                                        Disconnect
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={openWalletModal}
                                    disabled={isConnecting}
                                    className="w-full py-3.5 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(204,255,0,0.15)] disabled:opacity-70"
                                >
                                    <Wallet size={18} weight="duotone" />
                                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
