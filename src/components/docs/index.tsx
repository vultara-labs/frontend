"use client";

import { ReactNode } from "react";
import { Icon } from "@phosphor-icons/react";

// ============ Docs Header ============
interface DocsHeaderProps {
    category: string;
    title: string;
    subtitle: string;
}

export function DocsHeader({ category, title, subtitle }: DocsHeaderProps) {
    return (
        <div className="border-b border-[var(--border-subtle)] pb-6 sm:pb-8">
            <p className="text-[var(--volt)] font-bold uppercase tracking-widest text-xs mb-3">
                {category}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight mb-4 sm:mb-6">
                {title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {subtitle}
            </p>
        </div>
    );
}

// ============ Docs Section ============
interface DocsSectionProps {
    icon: Icon;
    iconColor?: string;
    title: string;
    children: ReactNode;
}

export function DocsSection({ icon: IconComponent, iconColor = "var(--volt)", title, children }: DocsSectionProps) {
    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${iconColor} 10%, transparent)` }}
                >
                    <IconComponent size={24} weight="duotone" style={{ color: iconColor }} />
                </div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            {children}
        </section>
    );
}

// ============ Docs Card ============
interface DocsCardProps {
    title: string;
    children: ReactNode;
    variant?: "default" | "success" | "warning" | "info";
}

export function DocsCard({ title, children, variant = "default" }: DocsCardProps) {
    const variants = {
        default: "border-[var(--border-subtle)] bg-[var(--obsidian-surface)]",
        success: "border-[var(--success)]/20 bg-[var(--success)]/5",
        warning: "border-[var(--warning)]/20 bg-[var(--warning)]/5",
        info: "border-[var(--volt)]/20 bg-[var(--volt)]/5"
    };

    return (
        <div className={`p-4 rounded-xl border ${variants[variant]}`}>
            <strong className="text-white block mb-2">{title}</strong>
            <span className="text-sm text-[var(--text-secondary)]">{children}</span>
        </div>
    );
}

// ============ Docs Info Box ============
interface DocsInfoBoxProps {
    icon: Icon;
    title: string;
    children: ReactNode;
}

export function DocsInfoBox({ icon: IconComponent, title, children }: DocsInfoBoxProps) {
    return (
        <div className="glass-panel p-6 rounded-xl border border-[var(--volt)]/20 bg-[var(--volt)]/5 relative overflow-hidden">
            <div className="flex gap-4">
                <IconComponent className="flex-shrink-0 text-[var(--volt)]" size={24} />
                <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <div className="text-sm leading-relaxed text-[var(--text-primary)]/80">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============ Docs Step List ============
interface DocsStepProps {
    step: number | string;
    title: string;
    description: string;
    color?: string;
}

export function DocsStep({ step, title, description, color = "var(--volt)" }: DocsStepProps) {
    return (
        <div className="flex gap-4 items-start">
            <div
                className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm shrink-0"
                style={{
                    borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                    color
                }}
            >
                {step}
            </div>
            <div>
                <h4 className="text-white font-bold">{title}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{description}</p>
            </div>
        </div>
    );
}

// ============ Docs Table ============
interface DocsTableRow {
    label: string;
    value: string | ReactNode;
    highlight?: boolean;
}

interface DocsTableProps {
    rows: DocsTableRow[];
}

export function DocsTable({ rows }: DocsTableProps) {
    return (
        <div className="p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-subtle)]">
            <table className="w-full text-sm">
                <tbody className="divide-y divide-[var(--border-subtle)]">
                    {rows.map((row, i) => (
                        <tr key={i}>
                            <td className="py-3 text-[var(--text-tertiary)] font-mono">{row.label}</td>
                            <td className={`py-3 ${row.highlight ? 'text-[var(--volt)] font-bold' : 'text-white'}`}>
                                {row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ============ Docs Page Wrapper ============
interface DocsPageWrapperProps {
    children: ReactNode;
}

export function DocsPageWrapper({ children }: DocsPageWrapperProps) {
    return (
        <div className="space-y-12 animate-[fadeIn_0.5s_ease-out]">
            {children}
        </div>
    );
}

// ============ Docs Content Body ============
interface DocsContentProps {
    children: ReactNode;
}

export function DocsContent({ children }: DocsContentProps) {
    return (
        <div className="space-y-12 text-[var(--text-secondary)]">
            {children}
        </div>
    );
}
