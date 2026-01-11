import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

// Wagmi config for Vultara
// Ready to use when smart contract is deployed
export const config = createConfig({
    chains: [base, baseSepolia],
    transports: {
        [base.id]: http(),
        [baseSepolia.id]: http(),
    },
});

// Use testnet by default during development
export const ACTIVE_CHAIN = baseSepolia;
