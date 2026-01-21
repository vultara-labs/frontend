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

// Comprehensive Demo Data for Preview Mode (when wallet is NOT connected)
export const DEMO_DATA = {
    // ETH Price (baseline for calculations)
    ETH_PRICE: 3200,

    // Vault Balance (funds deposited in Vultara)
    VAULT_BALANCE_ETH: 2.5,
    VAULT_BALANCE_USD: 8000, // 2.5 * 3200

    // Wallet Balance (ETH in connected wallet)
    WALLET_BALANCE_ETH: 1.85,
    WALLET_BALANCE_USD: 5920, // 1.85 * 3200

    // Earnings (simulated yield)
    MONTHLY_EARNINGS: 30.00, // ~4.5% APY per month
    TOTAL_EARNINGS: 245.50, // Simulated 8 months of earnings

    // Epoch Info
    NEXT_PAYOUT: '3d 14h',
    EPOCH_PROGRESS: 65,

    // For AI Chat Context
    DEMO_USER_SUMMARY: `
DEMO USER PROFILE (Preview Mode):
- Vault Balance: 2.5 ETH (~$8,000 USD)
- Wallet Balance: 1.85 ETH (~$5,920 USD)
- Monthly Yield: ~$30 (4.5% APY)
- Total Earnings: $245.50
- Status: Active Depositor (Demo Account)
- NOTE: This is simulated data for preview purposes.
`,
} as const;

export const YIELD = {
    calculateMonthly: (amount: number, apy: number = PROTOCOL.APY) =>
        (amount * (apy / 100) / 12),
    calculateYearly: (amount: number, apy: number = PROTOCOL.APY) =>
        (amount * (apy / 100)),
} as const;

// Risk visibility constants for explicit downside scenarios
export const RISK = {
    // Volatility-based yield ranges
    VOLATILITY_BANDS: {
        LOW: { label: 'Low Volatility', apyMin: 3, apyMax: 5, description: 'Stable market conditions' },
        NORMAL: { label: 'Normal', apyMin: 4, apyMax: 8, description: 'Average market volatility' },
        HIGH: { label: 'High Volatility', apyMin: 6, apyMax: 15, description: 'Volatile market, higher premiums' },
    },
    // Downside scenarios for put options (ETH price drop -> potential loss %)
    DOWNSIDE_SCENARIOS: [
        { dropPercent: 5, lossPercent: 0, label: 'Minor Dip', description: 'Options expire OTM, no loss' },
        { dropPercent: 15, lossPercent: 5, label: 'Correction', description: 'Options near ATM, partial loss' },
        { dropPercent: 30, lossPercent: 20, label: 'Crash', description: 'Deep ITM, significant loss' },
    ],
    // Calculate potential loss in USD
    calculateDownsideLoss: (depositUSD: number, dropPercent: number): number => {
        const scenario = RISK.DOWNSIDE_SCENARIOS.find(s => s.dropPercent === dropPercent);
        if (!scenario) return 0;
        return depositUSD * (scenario.lossPercent / 100);
    },
    // Risk disclaimers
    DISCLAIMERS: [
        'Yields are variable and depend on market volatility — not guaranteed.',
        'Smart contract risk exists. While Thetanuts is audited, no code is 100% bug-free.',
        'If ETH price drops significantly during an epoch, the vault may realize losses.',
        'Never deposit more than you can afford to lose.',
    ],
} as const;
