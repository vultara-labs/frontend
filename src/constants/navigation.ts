import {
    SquaresFour,
    Vault,
    Lightning,
    ArrowCircleDown,
    ArrowCircleUp,
    Calculator,
    BookOpen,
} from "@phosphor-icons/react";

export const DASHBOARD_NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: SquaresFour, group: "core" },
    { label: "Deposit", href: "/dashboard/deposit", icon: ArrowCircleUp, group: "core" },
    { label: "Vault Strategy", href: "/dashboard/vault", icon: Vault, group: "core" },
    { label: "Withdraw", href: "/dashboard/withdraw", icon: ArrowCircleDown, group: "core" },
    { label: "How to Earn", href: "/dashboard/learn", icon: BookOpen, group: "core" },
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
    { label: 'Base Network', href: 'https://base.org', hoverClass: 'hover:text-blue-400' },
    { label: 'Thetanuts Finance', href: 'https://thetanuts.finance', hoverClass: 'hover:text-[#00D9B5]' },
] as const;
