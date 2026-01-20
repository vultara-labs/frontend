"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DEMO_DATA } from "@/constants";

// Types
interface DemoState {
    vaultBalanceETH: number;
    walletBalanceETH: number;
    totalDeposited: number;
    totalWithdrawn: number;
    deposits: Array<{ amount: number; timestamp: number }>;
}

interface DemoStoreContextType {
    state: DemoState;
    deposit: (amount: number) => void;
    withdraw: (amount: number) => void;
    reset: () => void;
}

// Default state (based on DEMO_DATA)
const defaultState: DemoState = {
    vaultBalanceETH: DEMO_DATA.VAULT_BALANCE_ETH,
    walletBalanceETH: DEMO_DATA.WALLET_BALANCE_ETH,
    totalDeposited: 0,
    totalWithdrawn: 0,
    deposits: [],
};

const STORAGE_KEY = "vultara_demo_state";

// Context
const DemoStoreContext = createContext<DemoStoreContextType | null>(null);

// Provider component
export function DemoProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<DemoState>(defaultState);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setState(parsed);
            }
        } catch (e) {
            console.warn("Failed to hydrate demo state:", e);
        }
        setIsHydrated(true);
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.warn("Failed to persist demo state:", e);
            }
        }
    }, [state, isHydrated]);

    // Deposit action
    const deposit = (amount: number) => {
        setState(prev => ({
            ...prev,
            vaultBalanceETH: prev.vaultBalanceETH + amount,
            walletBalanceETH: Math.max(0, prev.walletBalanceETH - amount),
            totalDeposited: prev.totalDeposited + amount,
            deposits: [...prev.deposits, { amount, timestamp: Date.now() }],
        }));
    };

    // Withdraw action
    const withdraw = (amount: number) => {
        setState(prev => ({
            ...prev,
            vaultBalanceETH: Math.max(0, prev.vaultBalanceETH - amount),
            walletBalanceETH: prev.walletBalanceETH + amount,
            totalWithdrawn: prev.totalWithdrawn + amount,
        }));
    };

    // Reset to default
    const reset = () => {
        setState(defaultState);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <DemoStoreContext.Provider value={{ state, deposit, withdraw, reset }}>
            {children}
        </DemoStoreContext.Provider>
    );
}

// Hook to use demo store
export function useDemoStore() {
    const context = useContext(DemoStoreContext);
    if (!context) {
        // Return a fallback for SSR or when provider is not wrapped
        return {
            state: defaultState,
            deposit: () => { },
            withdraw: () => { },
            reset: () => { },
        };
    }
    return context;
}
