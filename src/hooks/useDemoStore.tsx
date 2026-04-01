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
    // Pending Queue Simulation
    pendingWithdrawalETH: number;
    withdrawalReadyTimestamp: number | null;
}

interface DemoStoreContextType {
    state: DemoState;
    deposit: (amount: number) => void;
    withdraw: (amount: number) => void;
    claim: () => void;
    cancel: () => void;
    reset: () => void;
}

// Default state (based on DEMO_DATA)
const defaultState: DemoState = {
    vaultBalanceETH: DEMO_DATA.VAULT_BALANCE_ETH,
    walletBalanceETH: DEMO_DATA.WALLET_BALANCE_ETH,
    totalDeposited: 0,
    totalWithdrawn: 0,
    deposits: [],
    pendingWithdrawalETH: 0,
    withdrawalReadyTimestamp: null,
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

    // Withdraw action (Schedule)
    const withdraw = (amount: number) => {
        setState(prev => ({
            ...prev,
            vaultBalanceETH: Math.max(0, prev.vaultBalanceETH - amount),
            // Move to pending, NOT wallet yet
            pendingWithdrawalETH: prev.pendingWithdrawalETH + amount,
            // Ready in 3 seconds (Fast Demo Queue)
            withdrawalReadyTimestamp: Date.now() + 3000,
        }));
    };

    // Claim action (Finalize)
    const claim = () => {
        setState(prev => {
            if (prev.pendingWithdrawalETH <= 0) return prev;
            return {
                ...prev,
                walletBalanceETH: prev.walletBalanceETH + prev.pendingWithdrawalETH,
                totalWithdrawn: prev.totalWithdrawn + prev.pendingWithdrawalETH,
                pendingWithdrawalETH: 0,
                withdrawalReadyTimestamp: null,
            };
        });
    };

    // Cancel action (Return to Vault)
    const cancel = () => {
        setState(prev => {
            if (prev.pendingWithdrawalETH <= 0) return prev;
            return {
                ...prev,
                vaultBalanceETH: prev.vaultBalanceETH + prev.pendingWithdrawalETH, // Return to vault
                pendingWithdrawalETH: 0,
                withdrawalReadyTimestamp: null,
            };
        });
    };

    // Reset to default
    const reset = () => {
        setState(defaultState);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <DemoStoreContext.Provider value={{ state, deposit, withdraw, claim, cancel, reset }}>
            {children}
        </DemoStoreContext.Provider>
    );
}

// Hook to use demo store
export function useDemoStore() {
    const context = useContext(DemoStoreContext);
    if (!context) {
        return {
            state: defaultState,
            deposit: () => { },
            withdraw: () => { },
            claim: () => { },
            cancel: () => { },
            reset: () => { },
        };
    }
    return context;
}
