import { Lightning, SealCheck, Trophy, Crown } from "@phosphor-icons/react";
import type { AccessLevel } from "@/types";

export const ACCESS_LEVELS: AccessLevel[] = [
    { name: "INITIATE", min: 0, icon: Lightning, color: "text-[var(--text-secondary)]" },
    { name: "ASSOCIATE", min: 1000, icon: SealCheck, color: "text-[var(--info)]" },
    { name: "PARTNER", min: 5000, icon: Trophy, color: "text-[var(--volt)]" },
    { name: "SOVEREIGN", min: 10000, icon: Crown, color: "text-[var(--warning)]" },
];

export const QUICK_PROMPTS = [
    "Explain Yield Farming",
    "Analyze Vault Risk",
    "How to Withdraw?",
] as const;

export const AUDIT_PARTNERS = [
    { name: 'CertiK', logo: '/logos/certik.png', href: 'https://www.certik.com', hoverColor: '[#00D4AA]' },
    { name: 'Hacken', logo: '/logos/hacken.svg', href: 'https://hacken.io', hoverColor: '[#30E3CA]' },
    { name: 'OpenZeppelin', logo: '/logos/openzeppelin.svg', href: 'https://www.openzeppelin.com', hoverColor: '[#4E5EE4]' },
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
    { title: "Salary Deposit", desc: "Employer deposits USDC. Real-time yield accrual begins." },
    { title: "Auto-Swap", desc: "Seamless conversion to IDRX stablecoin at market-best rates." },
    { title: "Rupiah Withdrawal", desc: "Lightning-fast transfer to local bank. Cash in minutes." },
] as const;
