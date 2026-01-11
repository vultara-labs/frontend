export const PROTOCOL = {
    APY: 4.5,
    STRATEGY_NAME: 'Thetanuts V4',
    STRATEGY_VERSION: 'V4',
    NETWORK: 'Base',
    NETWORK_COLOR: 'blue-500',
    VAULT: {
        NAME: 'ETH Covered Put',
        STRIKE_PRICE: 2150, // Slightly OTM
        ASSET: 'ETH',
        EPOCH_END: '2d 14h',
        CAPACITY: 84,
        TVL: '2.4M',
    }
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
