export const PROTOCOL = {
    APY: 4.5,
    STRATEGY_NAME: 'Thetanuts V4',
    STRATEGY_VERSION: 'V4',
    NETWORK: 'Base',
    NETWORK_COLOR: 'blue-500',
    VAULT: {
        NAME: 'ETH Covered Call', // Strategy Name
        ASSET: 'ETH',
        STRIKE_PERCENTAGE: 1.1, // 110% of Current Price (OTM Call)
        EPOCH_DURATION_DAYS: 7, // Weekly Epochs
    },
    CONTRACTS: {
        // Base Sepolia (Testnet)
        84532: {
            ETH_VAULT: '0x3C90E5477C9016eec4c48b9886a1Bc3c1c5C5bBa' as `0x${string}`,
        },
        // Base Mainnet (Future)
        8453: {
            ETH_VAULT: '0x0000000000000000000000000000000000000000' as `0x${string}`,
        },
    },
} as const;

export const DEMO = {
    WALLET_BALANCE: 5420.00,
    USER_BALANCE: 2450.00,
    MONTHLY_EARNINGS: 9.18,
    TOTAL_EARNINGS: 128.50,
    NEXT_PAYOUT: '4h 12m',
    PAYOUT_PROGRESS: 85,
} as const;

export const YIELD = {
    calculateMonthly: (amount: number, apy: number = PROTOCOL.APY) =>
        (amount * (apy / 100) / 12),
    calculateYearly: (amount: number, apy: number = PROTOCOL.APY) =>
        (amount * (apy / 100)),
} as const;
