import type { ComponentType } from "react";

export interface UserData {
    balance: number;
    monthlyEarnings: number;
    apy: number;
    nextPayout: string;
    payoutProgress: number;
    activities: Activity[];
}

export interface Activity {
    type: string;
    amount: string;
    label: string;
    date: string;
    icon: ComponentType<{ size?: number; className?: string }>;
    color: string;
}

export interface UserContextData {
    balance: number;
    earnings: number;
    apy: number;
}

export type AccessTier = "INITIATE" | "ASSOCIATE" | "PARTNER" | "SOVEREIGN";

export interface AccessLevel {
    name: AccessTier;
    min: number;
    icon: ComponentType<Record<string, unknown>>;
    color: string;
}
