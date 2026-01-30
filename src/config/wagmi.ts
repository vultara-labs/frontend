import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c57ca95b47569778a828d19178114f4d';

export const config = createConfig({
    chains: [base],
    connectors: [
        injected(),
        coinbaseWallet({ appName: 'Vultara' }),
        walletConnect({ projectId, showQrModal: true }),
    ],
    transports: {
        [base.id]: http(),
    },
});

export const ACTIVE_CHAIN = base;
