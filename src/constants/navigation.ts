import {
    SquaresFour,
    Vault,
    Lightning,
    ArrowCircleDown,
    ArrowCircleUp,
    Calculator,
} from "@phosphor-icons/react";

// Dashboard nav items with section grouping for visual hierarchy
export const DASHBOARD_NAV_ITEMS = [
    // Core
    { label: "Dashboard", href: "/dashboard", icon: SquaresFour, group: "core" },
    { label: "Deposit", href: "/dashboard/deposit", icon: ArrowCircleUp, group: "core" },
    { label: "Vault Strategy", href: "/dashboard/vault", icon: Vault, group: "core" },
    { label: "Withdraw", href: "/dashboard/withdraw", icon: ArrowCircleDown, group: "core" },
    // Tools
    { label: "Calculator", href: "/dashboard/calculator", icon: Calculator, group: "tools" },
    { label: "Nova AI", href: "/dashboard/ai", icon: Lightning, group: "tools" },
] as const;

export const LANDING_NAV_ITEMS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
] as const;

export const FOOTER_PRODUCT_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Documentation', href: '/docs' },
] as const;

export const FOOTER_ECOSYSTEM_LINKS = [
    { label: 'Base Network', href: 'https://base.org', color: 'blue-400' },
    { label: 'Thetanuts Finance', href: 'https://thetanuts.finance', color: '[#00D9B5]' },
] as const;
