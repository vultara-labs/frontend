"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DASHBOARD_NAV_ITEMS } from "@/constants";

type NavItem = (typeof DASHBOARD_NAV_ITEMS)[number];

interface SidebarNavLinkProps {
    item: NavItem;
    isActive: boolean;
    variant: "desktop" | "mobile";
}

export function SidebarNavLink({ item, isActive, variant }: SidebarNavLinkProps) {
    if (variant === "mobile") {
        return (
            <Link
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
    }

    return (
        <Link
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
}
