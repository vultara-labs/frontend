'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/config/wagmi';
import { useState, type ReactNode } from 'react';

interface Web3ProviderProps {
    children: ReactNode;
}

/**
 * Web3Provider wraps the application with wagmi and react-query providers.
 * This enables wallet connection and blockchain interactions.
 * 
 * Usage: Wrap your app with <Web3Provider> in layout.tsx when ready to integrate.
 * 
 * Currently NOT active - will be enabled after smart contract deployment.
 */
export function Web3Provider({ children }: Web3ProviderProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
