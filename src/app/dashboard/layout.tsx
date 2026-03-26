"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { List, X, CaretRight, SignOut } from "@phosphor-icons/react";
import { useWalletConnection, useDashboardData } from "@/hooks";
import { DASHBOARD_NAV_ITEMS } from "@/constants";
import { WalletModal } from "@/components/layout/WalletModal";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { SidebarNavLink } from "./sidebar-nav";
import { WalletCard } from "./wallet-card";
import { MobileDrawer } from "./mobile-drawer";

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
        disconnect: handleDisconnect,
        isWrongNetwork,
        switchNetwork,
    } = useWalletConnection();

    const { isPreviewMode, walletBalanceETH } = useDashboardData();

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
                    <Image src="/logo-dark.png" alt="Vultara" width={160} height={48} style={{ width: "auto", height: "1.75rem" }} />
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
            <MobileDrawer
                pathname={pathname}
                mobileMenuOpen={mobileMenuOpen}
                isConnectedSafe={isConnectedSafe}
                isConnecting={isConnecting}
                formattedAddress={formattedAddress}
                formattedBalance={formattedBalance}
                onClose={() => setMobileMenuOpen(false)}
                onDisconnect={handleDisconnect}
                openWalletModal={openWalletModal}
            />
            <aside className="hidden lg:flex w-72 border-r border-[var(--border-subtle)] bg-[var(--obsidian-base)] flex-col sticky top-0 h-screen z-40 px-4 py-6">
                <div className="mb-6 px-2">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image src="/logo-dark.png" alt="Vultara" width={160} height={48} className="opacity-90 group-hover:opacity-100 transition-opacity" style={{ width: "auto", height: "2rem" }} />
                    </Link>
                </div>

                <WalletCard
                    isConnectedSafe={isConnectedSafe}
                    isWrongNetwork={isWrongNetwork}
                    isPreviewMode={isPreviewMode}
                    walletBalanceETH={walletBalanceETH}
                    formattedBalance={formattedBalance}
                    formattedAddress={formattedAddress}
                    switchNetwork={switchNetwork}
                    openWalletModal={openWalletModal}
                />

                <nav className="flex-1 space-y-1">
                    {/* Core Section */}
                    {DASHBOARD_NAV_ITEMS.filter(item => item.group === "core").map((item) => (
                        <SidebarNavLink key={item.href} item={item} isActive={pathname === item.href} variant="desktop" />
                    ))}

                    {/* Tools Section Divider */}
                    <div className="pt-4 pb-2 px-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Tools</span>
                            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
                        </div>
                    </div>

                    {/* Tools Section */}
                    {DASHBOARD_NAV_ITEMS.filter(item => item.group === "tools").map((item) => (
                        <SidebarNavLink key={item.href} item={item} isActive={pathname === item.href} variant="desktop" />
                    ))}
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
                {/* Ambient Background -- static CSS gradient (no JS animation, GPU-efficient) */}
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        background: "radial-gradient(ellipse 80% 60% at 80% 10%, rgba(204,255,0,0.07), transparent 60%), radial-gradient(ellipse 70% 50% at 10% 90%, rgba(59,130,246,0.06), transparent 60%), radial-gradient(ellipse 50% 50% at 50% 50%, rgba(168,85,247,0.03), transparent 60%)"
                    }}
                />

                <div className="flex-1 flex flex-col relative z-10 w-full">
                    {/* Wrong Network Banner */}
                    {isWrongNetwork ? (
                        <div className="relative z-20 bg-red-900/10 border-b border-red-500/20 flex-shrink-0">
                            <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                                    <span className="text-[9px] sm:text-[10px] font-bold text-red-500 uppercase tracking-wider sm:tracking-widest">Wrong Network</span>
                                    <span className="text-[9px] text-red-500/60 hidden sm:inline">• Please switch to Base</span>
                                </div>
                                <button
                                    onClick={switchNetwork}
                                    className="text-[9px] sm:text-[10px] font-bold bg-red-500/10 hover:bg-red-500/20 text-red-500 px-2 sm:px-3 py-1 rounded-md transition-colors uppercase tracking-wide flex items-center gap-1 border border-red-500/20 cursor-pointer"
                                >
                                    Switch Network
                                    <CaretRight size={10} weight="bold" />
                                </button>
                            </div>
                        </div>
                    ) : !isConnectedSafe && (
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

                    <div className="flex-1 overflow-y-auto"><ErrorBoundary>{children}</ErrorBoundary></div>
                </div>
            </main>
        </div>
    );
}
