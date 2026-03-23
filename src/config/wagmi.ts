import { http, createConfig } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';
if (!projectId && typeof window !== 'undefined') {
    console.warn('[Vultara] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. WalletConnect will be unavailable.');
}

export const config = createConfig({
    chains: [base, mainnet],
    connectors: [
        injected(),
        coinbaseWallet({ appName: 'Vultara' }),
        walletConnect({ projectId, showQrModal: true }),
    ],
    transports: {
        [base.id]: http(),
        [mainnet.id]: http(),
    },
});

export const ACTIVE_CHAIN = base;
