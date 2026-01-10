"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Shield, Zap, Database, ArrowLeft } from "lucide-react";

const DOCS_NAV = [
    {
        category: "Getting Started",
        items: [
            { label: "Introduction", href: "/docs", icon: BookOpen },
            { label: "Core Concepts", href: "/docs/concepts", icon: Database },
        ]
    },
    {
        category: "Protocol",
        items: [
            { label: "Yield Mechanics", href: "/docs/yield", icon: Zap },
            { label: "Security & Risks", href: "/docs/security", icon: Shield },
        ]
    }
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[var(--obsidian-base)] flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0 border-r border-[var(--border-subtle)] bg-[var(--obsidian-base)] lg:h-screen lg:sticky lg:top-0 z-40">
                <div className="p-6 h-full flex flex-col">
                    <Link href="/" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors mb-8 group text-sm font-medium">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Vultara
                    </Link>

                    <div className="space-y-8 flex-1 overflow-y-auto">
                        {DOCS_NAV.map((section) => (
                            <div key={section.category}>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-4 pl-3">
                                    {section.category}
                                </h4>
                                <ul className="space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={`
                                                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-300
                                                        ${isActive
                                                            ? "bg-[var(--volt)]/10 text-[var(--volt)] font-bold border border-[var(--volt)]/20"
                                                            : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5 border border-transparent"
                                                        }
                                                    `}
                                                >
                                                    <Icon size={16} className={isActive ? "text-[var(--volt)]" : "opacity-70"} />
                                                    {item.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-[var(--border-subtle)] mt-auto">
                        <p className="text-[10px] text-[var(--text-tertiary)] text-center">
                            Vultara Documentation v1.0
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 lg:py-16">
                    {children}
                </div>
            </main>
        </div>
    );
}
