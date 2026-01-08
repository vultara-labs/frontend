"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    Zap,
    ArrowDownToLine,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Vault Strategy", href: "/dashboard/vault", icon: Wallet },
    { label: "Withdraw IDR", href: "/dashboard/withdraw", icon: ArrowDownToLine },
    { label: "Shieldie AI", href: "/dashboard/ai", icon: Zap },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[var(--obsidian-base)] flex font-sans selection:bg-[var(--volt)] selection:text-black">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/[0.05] bg-[var(--obsidian-base)] flex flex-col sticky top-0 h-screen z-40">
                {/* Logo Section */}
                <div className="p-8 pb-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <img src="/logo-dark.png" alt="Vultara" className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <div className="mt-4 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#A1A1AA]">
                            Mainnet Alpha
                        </span>
                    </div>
                </div>

                {/* Navigation */}
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
                                    className={`transition-colors duration-300 ${isActive ? "text-[var(--volt)]" : "group-hover:text-white"
                                        }`}
                                />
                                <span className="text-sm font-medium tracking-wide">{item.label}</span>
                                {isActive && (
                                    <ChevronRight size={14} className="ml-auto text-[var(--volt)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-white/[0.05] bg-[var(--obsidian-surface)]">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--volt)] to-emerald-500 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-[var(--volt)]/20">
                                0x
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-bold truncate group-hover:text-[var(--volt)] transition-colors">
                                    0x1a2...3c4d
                                </p>
                                <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-medium">
                                    Base Network
                                </p>
                            </div>
                            <Settings size={16} className="text-[#A1A1AA] group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[var(--obsidian-base)]">
                {/* Background Gradients similar to Hero */}
                <div className="fixed top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--volt)]/5 via-transparent to-transparent pointer-events-none" />

                <div className="flex-1 overflow-y-auto relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
