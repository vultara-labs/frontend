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

    // Read user's vault balance (SHARES) from smart contract
    const { data: vaultSharesRaw } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "getUserBalance",
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected,
        }
    });

    // Convert SHARES to ASSETS (ETH) to get real value (Principal + Yield)
    const { data: vaultAssetsRaw } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "convertToAssets",
        args: vaultSharesRaw ? [vaultSharesRaw] : undefined,
        query: {
            enabled: !!vaultSharesRaw && isConnected,
        }
    });

    // Check for pending withdrawals
    const { data: pendingSharesRaw } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "pendingWithdrawals",
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected,
        }
    });

    const pendingWithdrawalShares = pendingSharesRaw ? parseFloat(formatUnits(pendingSharesRaw as bigint, 18)) : 0;

    // Convert pending shares to ETH value
    const { data: pendingAssetsRaw } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "convertToAssets",
        args: pendingSharesRaw ? [pendingSharesRaw] : undefined,
        query: {
            enabled: !!pendingSharesRaw && pendingWithdrawalShares > 0,
        }
    });

    const pendingWithdrawalETH = pendingAssetsRaw
        ? parseFloat(formatUnits(pendingAssetsRaw as bigint, 18))
        : pendingWithdrawalShares; // Fallback 1:1

    // Calculate real values from contract
    const realVaultShares = vaultSharesRaw ? parseFloat(formatUnits(vaultSharesRaw as bigint, 18)) : 0;
    // Default to shares if assets fetch fails/loading (1:1 fallback), but prefer assets
    const realVaultBalanceETH = vaultAssetsRaw
        ? parseFloat(formatUnits(vaultAssetsRaw as bigint, 18))
        : realVaultShares;

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


    const isPreviewMode = !isConnected;

    const vaultBalanceETH = isPreviewMode ? demoState.vaultBalanceETH : realVaultBalanceETH;
    const vaultBalanceUSD = isPreviewMode ? demoState.vaultBalanceETH * ethPrice : realVaultBalanceUSD;

    const walletBalanceETH = isPreviewMode ? demoState.walletBalanceETH : realWalletBalanceETH;
    const walletBalanceUSD = isPreviewMode ? demoState.walletBalanceETH * ethPrice : realWalletBalanceUSD;

    const demoMonthlyEarningsUSD = (vaultBalanceUSD * (currentAPY / 100)) / 12;
    const monthlyEarningsUSD = isPreviewMode ? demoMonthlyEarningsUSD : realMonthlyEarningsUSD;
    const totalEarningsUSD = isPreviewMode ? DEMO_DATA.TOTAL_EARNINGS + (demoState.totalDeposited * 0.01) : (realMonthlyEarningsUSD * 3);

    return {
        isPreviewMode,
        isConnected,
        address,
        ethPrice,
        priceChange,
        currentAPY,
        marketLoading,
        vaultBalanceETH,
        vaultBalanceUSD,
        pendingWithdrawalShares,
        pendingWithdrawalETH,
        walletBalanceETH,
        walletBalanceUSD,
        monthlyEarningsUSD,
        totalEarningsUSD,
        demoDeposit,
        demoWithdraw,
        demoReset,
        contracts,
        chainId,
    };
}

