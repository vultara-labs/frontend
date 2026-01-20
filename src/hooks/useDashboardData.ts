"use client";

import { useWalletConnection, useMarketData } from "@/hooks";
import { PROTOCOL, DEMO_DATA, VULTARA_ETH_VAULT_ABI } from "@/constants";
import { formatUnits } from "viem";
import { useChainId, useReadContract } from "wagmi";
import { useDemoStore } from "./useDemoStore";

/**
 * Central hook to manage dashboard data
 * - Returns DEMO store data when wallet is NOT connected (Preview Mode)
 * - Returns REAL-TIME data from wallet when connected (Live Mode)
 */
export function useDashboardData() {
    const { isConnected, address, ethBalance } = useWalletConnection();
    const chainId = useChainId();
    const { data: marketData, loading: marketLoading } = useMarketData("ETH");
    const { state: demoState, deposit: demoDeposit, withdraw: demoWithdraw, reset: demoReset } = useDemoStore();

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

    // Vault balance - use demo store state for preview
    const vaultBalanceETH = isPreviewMode ? demoState.vaultBalanceETH : realVaultBalanceETH;
    const vaultBalanceUSD = isPreviewMode ? demoState.vaultBalanceETH * ethPrice : realVaultBalanceUSD;

    // Wallet balance - use demo store state for preview
    const walletBalanceETH = isPreviewMode ? demoState.walletBalanceETH : realWalletBalanceETH;
    const walletBalanceUSD = isPreviewMode ? demoState.walletBalanceETH * ethPrice : realWalletBalanceUSD;

    // Earnings - calculate based on demo vault balance
    const demoMonthlyEarningsUSD = (vaultBalanceUSD * (currentAPY / 100)) / 12;
    const monthlyEarningsUSD = isPreviewMode ? demoMonthlyEarningsUSD : realMonthlyEarningsUSD;
    const totalEarningsUSD = isPreviewMode ? DEMO_DATA.TOTAL_EARNINGS + (demoState.totalDeposited * 0.01) : (realMonthlyEarningsUSD * 3);

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

        // Demo actions (for deposit/withdraw pages)
        demoDeposit,
        demoWithdraw,
        demoReset,

        // Raw data for advanced usage
        contracts,
        chainId,
    };
}

