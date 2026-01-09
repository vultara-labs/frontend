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

// Contract addresses (to be updated after deployment)
export const CONTRACTS = {
    // Mainnet (Base)
    mainnet: {
        vault: '0x0000000000000000000000000000000000000000', // TODO: Deploy vault
        usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
    },
    // Testnet (Base Sepolia)
    testnet: {
        vault: '0x0000000000000000000000000000000000000000', // TODO: Deploy vault
        usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
    },
};

// Use testnet by default during development
export const ACTIVE_CHAIN = baseSepolia;
export const ACTIVE_CONTRACTS = CONTRACTS.testnet;
