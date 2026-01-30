"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, CaretRight, Wallet, SignOut, Eye } from "@phosphor-icons/react";
import { useWalletConnection, useDashboardData } from "@/hooks";
import { DASHBOARD_NAV_ITEMS, DEMO_DATA } from "@/constants";
import { WalletModal } from "@/components/layout/WalletModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const {
        isConnected,
        isConnecting,
        formattedAddress,
        formattedBalance,
        connect: connectWallet,
        disconnect: handleDisconnect,
    } = useWalletConnection();

    // Get preview mode data
    const { isPreviewMode, vaultBalanceETH, walletBalanceETH } = useDashboardData();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (mobileMenuOpen || isWalletModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen, isWalletModalOpen]);

    const isConnectedSafe = mounted && isConnected;

    const openWalletModal = () => setIsWalletModalOpen(true);

    return (
        <div className="min-h-screen bg-[var(--obsidian-base)] flex flex-col lg:flex-row font-sans selection:bg-[var(--volt)] selection:text-black">
            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
            />

            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--border-subtle)] bg-[var(--obsidian-base)]/95 backdrop-blur-xl flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo-dark.png" alt="Vultara" className="h-7 w-auto" />
                </Link>

                <div className="flex items-center gap-3">
                    <div className="px-2.5 py-1 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                        <span className="text-[10px] text-[var(--success)] font-bold uppercase tracking-wider">Live</span>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.03] border border-[var(--border-subtle)] text-white hover:bg-white/[0.06] transition-colors"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMobileMenuOpen(false)}
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
                                    <img src="/logo-dark.png" alt="Vultara" className="h-8 w-auto" />
                                </Link>
                                <div className="mt-3 px-3 py-1.5 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--success)]">Mainnet</span>
                                </div>
                            </div>

                            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                {DASHBOARD_NAV_ITEMS.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`group relative flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 border ${isActive
                                                ? "bg-[var(--volt)]/10 text-[var(--volt)] border-[var(--volt)]/20 shadow-[0_0_15px_var(--volt-glow)]"
                                                : "border-transparent text-[var(--text-secondary)] hover:bg-white/[0.03] hover:text-white"
                                                }`}
                                        >
                                            <item.icon size={22} className={`transition-colors duration-300 ${isActive ? "text-[var(--volt)]" : "group-hover:text-white"}`} />
                                            <span className="text-base font-bold tracking-wide">{item.label}</span>
                                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--volt)] shadow-[0_0_8px_var(--volt)]" />}
                                        </Link>
                                    );
                                })}
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
                                            onClick={handleDisconnect}
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

            <aside className="hidden lg:flex w-72 border-r border-[var(--border-subtle)] bg-[var(--obsidian-base)] flex-col sticky top-0 h-screen z-40 px-4 py-6">
                <div className="mb-6 px-2">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/logo-dark.png" alt="Vultara" className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>

                {/* Wallet Card - Abstract Style */}
                <div className="mb-8 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--volt)]/20 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-5 rounded-3xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] shadow-xl overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--volt)]/10 rounded-full blur-2xl -mr-10 -mt-10" />

                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${isConnectedSafe ? "bg-[var(--success)] shadow-[0_0_8px_var(--success)]" : "bg-[var(--warning)]"}`} />
                                {isConnectedSafe ? "Connected" : "Preview"}
                            </span>
                            {isPreviewMode ? (
                                <Eye size={18} className="text-[var(--warning)]" />
                            ) : (
                                <Wallet size={18} className="text-[var(--text-tertiary)]" />
                            )}
                        </div>

                        <div className="mb-4">
                            {isPreviewMode ? (
                                <div>
                                    <p className="text-3xl font-black text-white tracking-tight mb-1">{walletBalanceETH.toFixed(2)} ETH</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-[var(--warning)] font-bold bg-[var(--warning)]/10 px-2 py-1 rounded border border-[var(--warning)]/20">
                                            Demo Data
                                        </span>
                                        <button
                                            onClick={openWalletModal}
                                            className="text-[10px] text-[var(--volt)] font-bold hover:underline"
                                        >
                                            Connect →
                                        </button>
                                    </div>
                                </div>
                            ) : !isConnectedSafe ? (
                                <button
                                    onClick={openWalletModal}
                                    className="w-full py-2.5 rounded-xl bg-[var(--volt)] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                                >
                                    Connect
                                </button>
                            ) : (
                                <div>
                                    <p className="text-3xl font-black text-white tracking-tight mb-1">{formattedBalance}</p>
                                    <p className="text-[10px] text-[var(--text-tertiary)] font-mono truncate px-2 py-1 rounded bg-black/20 inline-block border border-white/5">
                                        {formattedAddress}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {/* Core Section */}
                    {DASHBOARD_NAV_ITEMS.filter(item => item.group === "core").map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--volt)] ${isActive ? "scale-[1.02]" : "hover:bg-white/[0.05]"}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-nav-bg"
                                        className="absolute inset-0 bg-[var(--volt)] rounded-2xl shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                <span className={`relative z-10 flex items-center gap-3 ${isActive ? "text-black" : "text-[var(--text-secondary)] group-hover:text-white"}`}>
                                    <item.icon size={20} weight={isActive ? "fill" : "regular"} className={`transition-colors ${isActive ? "text-black" : "group-hover:text-white"}`} />
                                    <span className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
                                </span>
                            </Link>
                        );
                    })}

                    {/* Tools Section Divider */}
                    <div className="pt-4 pb-2 px-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Tools</span>
                            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                        </div>
                    </div>

                    {/* Tools Section */}
                    {DASHBOARD_NAV_ITEMS.filter(item => item.group === "tools").map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--volt)] ${isActive ? "scale-[1.02]" : "hover:bg-white/[0.05]"}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-nav-bg"
                                        className="absolute inset-0 bg-[var(--volt)] rounded-2xl shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                <span className={`relative z-10 flex items-center gap-3 ${isActive ? "text-black" : "text-[var(--text-secondary)] group-hover:text-white"}`}>
                                    <item.icon size={20} weight={isActive ? "fill" : "regular"} className={`transition-colors ${isActive ? "text-black" : "group-hover:text-white"}`} />
                                    <span className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-2">
                    {isConnectedSafe && (
                        <button
                            onClick={handleDisconnect}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[var(--text-tertiary)] hover:text-white hover:bg-white/[0.03] transition-all"
                        >
                            <SignOut size={20} />
                            <span className="text-sm font-bold">Log Out</span>
                        </button>
                    )}
                </div>
            </aside>

            <main className="flex-1 flex flex-col relative overflow-hidden bg-[var(--obsidian-base)] pt-16 lg:pt-0">
                {/* Ambient Living Background */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                            x: [0, 50, -50, 0],
                            y: [0, -50, 50, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[var(--volt)]/10 blur-[120px] rounded-full mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.1, 0.15, 0.1],
                            x: [0, -70, 70, 0],
                            y: [0, 50, -50, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[30%] left-[30%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen"
                    />
                </div>

                <div className="flex-1 flex flex-col relative z-10 w-full">
                    {!isConnectedSafe && (
                        <div className="relative z-20 bg-[var(--warning)]/5 border-b border-[var(--warning)]/20 flex-shrink-0">
                            <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse flex-shrink-0" />
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[var(--warning)] uppercase tracking-wider sm:tracking-widest">Preview</span>
                                    <span className="text-[9px] text-[var(--warning)]/60 hidden sm:inline">• Demo data</span>
                                </div>
                                <button
                                    onClick={openWalletModal}
                                    disabled={isConnecting}
                                    className="text-[9px] sm:text-[10px] font-bold bg-[var(--warning)]/10 hover:bg-[var(--warning)]/20 text-[var(--warning)] px-2 sm:px-3 py-1 rounded-md transition-colors uppercase tracking-wide flex items-center gap-1"
                                >
                                    {isConnecting ? "..." : "Connect"}
                                    <CaretRight size={10} weight="bold" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto">{children}</div>
                </div>
            </main>
        </div>
    );
}
