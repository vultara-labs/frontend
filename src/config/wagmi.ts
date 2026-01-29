import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c57ca95b47569778a828d19178114f4d'; // Fallback for testing

export const config = createConfig({
    chains: [base, baseSepolia],
    connectors: [
        injected(),
        coinbaseWallet({ appName: 'Vultara' }),
        walletConnect({ projectId, showQrModal: true }),
    ],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
    },
});

export const ACTIVE_CHAIN = base;
