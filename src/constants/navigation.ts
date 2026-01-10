import {
    SquaresFour,
    Vault,
    Lightning,
    ArrowCircleDown,
    ArrowCircleUp,
} from "@phosphor-icons/react";

export const DASHBOARD_NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: SquaresFour },
    { label: "Deposit USDC", href: "/dashboard/deposit", icon: ArrowCircleUp },
    { label: "Vault Strategy", href: "/dashboard/vault", icon: Vault },
    { label: "Withdraw USDC", href: "/dashboard/withdraw", icon: ArrowCircleDown },
    { label: "Nova AI", href: "/dashboard/ai", icon: Lightning },
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
    { label: 'IDRX Stablecoin', href: 'https://idrx.co', color: 'blue-400' },
] as const;
