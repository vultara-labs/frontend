export const PROTOCOL = {
    APY: 4.5,
    STRATEGY_NAME: 'Thetanuts V3',
    STRATEGY_VERSION: 'V4',
    NETWORK: 'Base',
    NETWORK_COLOR: 'blue-500',
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
