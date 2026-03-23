import { Lightning, SealCheck, Trophy, Crown, Wallet, Bank, ChartLineUp, Sparkle } from "@phosphor-icons/react";
import type { AccessLevel } from "@/types";

export const ACCESS_LEVELS: AccessLevel[] = [
    {
        name: "INITIATE",
        min: 0,
        icon: Lightning,
        color: "text-[var(--text-secondary)]",
        benefits: ["Standard Yields", "Basic Nova Support"]
    },
    {
        name: "ASSOCIATE",
        min: 1000,
        icon: SealCheck,
        color: "text-[var(--info)]",
        benefits: ["Yield Boost 1.05x", "Reduced Gas Fees", "Priority Support"]
    },
    {
        name: "PARTNER",
        min: 5000,
        icon: Trophy,
        color: "text-[var(--volt)]",
        benefits: ["Yield Boost 1.1x", "Zero Platform Fees", "Private Strategy Access"]
    },
    {
        name: "SOVEREIGN",
        min: 10000,
        icon: Crown,
        color: "text-[var(--warning)]",
        benefits: ["Yield Boost 1.25x", "Concierge Onboarding", "Custom Vault Strategy"]
    },
];

export const QUICK_PROMPTS = [
    "Explain Yield Farming",
    "Analyze Vault Risk",
    "How to Withdraw?",
] as const;

export const AUDIT_PARTNERS = [
    { name: 'CertiK', logo: '/logos/certik.png', href: 'https://www.certik.com', hoverClasses: 'hover:border-[#00D4AA]/30 hover:bg-[#00D4AA]/5' },
    { name: 'Hacken', logo: '/logos/hacken.svg', href: 'https://hacken.io', hoverClasses: 'hover:border-[#30E3CA]/30 hover:bg-[#30E3CA]/5' },
    { name: 'OpenZeppelin', logo: '/logos/openzeppelin.svg', href: 'https://www.openzeppelin.com', hoverClasses: 'hover:border-[#4E5EE4]/30 hover:bg-[#4E5EE4]/5' },
] as const;

export const TECH_STATS = [
    { label: "Latency", val: "0.05s" },
    { label: "Encryption", val: "256-bit" },
    { label: "Uptime", val: "99.99%" },
    { label: "Swap Fees", val: "0%" },
] as const;

export const USER_JOURNEY_STEPS = [
    { title: "Passkey Login", desc: "Secure 2-second auth with biometrics. No seed phrase required." },
    { title: "Contract Setup", desc: "One-click smart contract deployment to receive stablecoins." },
    { title: "Salary Deposit", desc: "Employer deposits ETH. Real-time yield accrual begins." },
    { title: "Watch It Grow", desc: "Track your earnings in real-time through the dashboard." },
    { title: "Easy Withdraw", desc: "Withdraw your ETH and yield anytime you need it." },
] as const;

export const MISSIONS = [
    {
        id: "connect",
        title: "Connect Wallet",
        desc: "Link your Web3 wallet to start.",
        reward: "Verify",
        xp: 100,
        icon: Wallet,
    },
    {
        id: "deposit",
        title: "First Deposit",
        desc: "Fund your account with >0.01 ETH.",
        reward: "Associate Status",
        xp: 500,
        icon: Bank,
    },
    {
        id: "nova",
        title: "Risk Analysis",
        desc: "Ask Nova AI about your portfolio.",
        reward: "Strategy Intel",
        xp: 300,
        icon: Sparkle,
    },
    {
        id: "vault",
        title: "Vault Explorer",
        desc: "View Thetanuts V4 Strategy details.",
        reward: "Yield Boost",
        xp: 200,
        icon: ChartLineUp,
    },
] as const;
