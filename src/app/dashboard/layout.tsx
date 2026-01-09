"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
    SquaresFour,
    Vault,
    Lightning,
    ArrowCircleDown,
    ArrowCircleUp,
    List,
    X,
    CaretRight,
    GearSix,
    Wallet
} from "@phosphor-icons/react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: SquaresFour },
    { label: "Deposit USDC", href: "/dashboard/deposit", icon: ArrowCircleUp },
    { label: "Vault Strategy", href: "/dashboard/vault", icon: Vault },
    { label: "Withdraw IDR", href: "/dashboard/withdraw", icon: ArrowCircleDown },
    { label: "Nova AI", href: "/dashboard/ai", icon: Lightning },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <div className="min-h-screen bg-[var(--obsidian-base)] flex flex-col lg:flex-row font-sans selection:bg-[var(--volt)] selection:text-black">

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--border-subtle)] bg-[var(--obsidian-base)]/95 backdrop-blur-xl flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3">
                    <img src="/logo-dark.png" alt="Vultara" className="h-7 w-auto" />
                </Link>

                <div className="flex items-center gap-3">
                    {/* Mini Status Badge */}
                    <div className="px-2.5 py-1 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                        <span className="text-[10px] text-[var(--success)] font-bold uppercase tracking-wider">Live</span>
                    </div>

                    {/* Mobile Menu Toggle */}
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[var(--obsidian-base)] border-r border-[var(--border-subtle)] z-50 flex flex-col"
                        >
                            {/* Mobile Menu Header */}
                            <div className="p-6 pb-4 border-b border-[var(--border-subtle)]">
                                <Link href="/" className="flex items-center gap-3">
                                    <img src="/logo-dark.png" alt="Vultara" className="h-8 w-auto" />
                                </Link>
                                <div className="mt-3 px-3 py-1.5 rounded-full bg-[var(--warning)]/10 border border-[var(--warning)]/20 inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--warning)]">
                                        Testnet
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`group relative flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-300 ${isActive
                                                ? "bg-white/[0.08] text-white"
                                                : "text-[var(--text-secondary)] hover:bg-white/[0.03] hover:text-white"
                                                }`}
                                        >
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--volt)] rounded-r-full shadow-[0_0_12px_var(--volt-glow)]" />
                                            )}
                                            <item.icon
                                                size={22}
                                                className={`transition-colors duration-300 ${isActive ? "text-[var(--volt)]" : "group-hover:text-white"}`}
                                            />
                                            <span className="text-base font-medium tracking-wide">{item.label}</span>
                                            {isActive && (
                                                <CaretRight size={16} weight="bold" className="ml-auto text-[var(--volt)]" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Mobile User Profile */}
                            <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--obsidian-surface)]">
                                <button
                                    onClick={() => toast.info("Wallet connection coming soon!", { description: "Smart contract is being deployed to Base Network." })}
                                    className="w-full py-3.5 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                                >
                                    <Wallet size={18} weight="duotone" />
                                    Connect Wallet
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 border-r border-[var(--border-subtle)] bg-[var(--obsidian-base)] flex-col sticky top-0 h-screen z-40">
                {/* Logo Section */}
                <div className="p-8 pb-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/logo-dark.png" alt="Vultara" className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <div className="mt-4 px-3 py-1.5 rounded-full bg-[var(--warning)]/10 border border-[var(--warning)]/20 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)]" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--warning)]">
                            Testnet
                        </span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-white/[0.08] text-white"
                                    : "text-[var(--text-secondary)] hover:bg-white/[0.03] hover:text-white"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--volt)] rounded-r-full shadow-[0_0_12px_var(--volt-glow)]" />
                                )}
                                <item.icon
                                    size={20}
                                    className={`transition-colors duration-300 ${isActive ? "text-[var(--volt)]" : "group-hover:text-white"}`}
                                />
                                <span className="text-sm font-medium tracking-wide">{item.label}</span>
                                {isActive && (
                                    <CaretRight size={14} weight="bold" className="ml-auto text-[var(--volt)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Connect Wallet */}
                <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--obsidian-surface)]">
                    <button
                        onClick={() => toast.info("Wallet connection coming soon!", { description: "Smart contract is being deployed to Base Network." })}
                        className="w-full py-3 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                    >
                        <Wallet size={16} weight="duotone" />
                        Connect Wallet
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[var(--obsidian-base)] pt-16 lg:pt-0">
                {/* Background Gradients similar to Hero */}
                <div className="fixed top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--volt)]/5 via-transparent to-transparent pointer-events-none" />

                <div className="flex-1 overflow-y-auto relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
