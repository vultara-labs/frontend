"use client";

import { useWalletConnection, useMarketData } from "@/hooks";
import { PROTOCOL, DEMO_DATA, VULTARA_ETH_VAULT_ABI } from "@/constants";
import { formatUnits } from "viem";
import { useChainId, useReadContract } from "wagmi";

/**
 * Central hook to manage dashboard data
 * - Returns DEMO_DATA when wallet is NOT connected (Preview Mode)
 * - Returns REAL-TIME data from wallet when connected (Live Mode)
 */
export function useDashboardData() {
    const { isConnected, address, ethBalance } = useWalletConnection();
    const chainId = useChainId();
    const { data: marketData, loading: marketLoading } = useMarketData("ETH");

    // Get contract addresses for current chain
    const contracts = PROTOCOL.CONTRACTS[chainId as keyof typeof PROTOCOL.CONTRACTS] || PROTOCOL.CONTRACTS[84532];

    // Read user's vault balance from smart contract (only when connected)
    const { data: vaultBalanceRaw } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "getUserBalance",
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected,
        }
    });

    // Calculate real values from contract
    const realVaultBalanceETH = vaultBalanceRaw ? parseFloat(formatUnits(vaultBalanceRaw as bigint, 18)) : 0;
    const realWalletBalanceETH = ethBalance ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)) : 0;

    // Live ETH Price
    const ethPrice = marketData?.price || DEMO_DATA.ETH_PRICE;

    // Dynamic APY Calculation (Synced with Vault Page)
    const priceChange = marketData?.change24h || 0;
    const volatilityPremium = Math.abs(priceChange) * 0.3;
    const currentAPY = parseFloat((PROTOCOL.APY + volatilityPremium).toFixed(2));

    // Calculate USD values
    const realVaultBalanceUSD = realVaultBalanceETH * ethPrice;
    const realWalletBalanceUSD = realWalletBalanceETH * ethPrice;

    // Estimated monthly earnings based on APY
    const realMonthlyEarningsUSD = (realVaultBalanceUSD * (currentAPY / 100)) / 12;

    // ============================================
    // FINAL DATA - Switches between Demo vs Real
    // ============================================
    const isPreviewMode = !isConnected;

    // Vault balance
    const vaultBalanceETH = isPreviewMode ? DEMO_DATA.VAULT_BALANCE_ETH : realVaultBalanceETH;
    const vaultBalanceUSD = isPreviewMode ? DEMO_DATA.VAULT_BALANCE_USD : realVaultBalanceUSD;

    // Wallet balance
    const walletBalanceETH = isPreviewMode ? DEMO_DATA.WALLET_BALANCE_ETH : realWalletBalanceETH;
    const walletBalanceUSD = isPreviewMode ? DEMO_DATA.WALLET_BALANCE_USD : realWalletBalanceUSD;

    // Earnings
    const monthlyEarningsUSD = isPreviewMode ? DEMO_DATA.MONTHLY_EARNINGS : realMonthlyEarningsUSD;
    const totalEarningsUSD = isPreviewMode ? DEMO_DATA.TOTAL_EARNINGS : (realMonthlyEarningsUSD * 3); // Simulated 3 months

    return {
        // Mode indicator
        isPreviewMode,
        isConnected,
        address,

        // Market data
        ethPrice,
        priceChange,
        currentAPY,
        marketLoading,

        // Vault data
        vaultBalanceETH,
        vaultBalanceUSD,

        // Wallet data
        walletBalanceETH,
        walletBalanceUSD,

        // Earnings
        monthlyEarningsUSD,
        totalEarningsUSD,

        // Raw data for advanced usage
        contracts,
        chainId,
    };
}
