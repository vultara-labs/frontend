"use client";

import { useWalletConnection, useMarketData } from "@/hooks";
import { PROTOCOL, DEMO_DATA } from "@/constants";
import { formatUnits } from "viem";
import { useChainId } from "wagmi";
import { useVaultContract } from "./useVaultContract";
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
    const { state: demoState, deposit: demoDeposit, withdraw: demoWithdraw, claim: demoClaim, cancel: demoCancel, reset: demoReset } = useDemoStore();

    // Get contract addresses for current chain
    const contracts = PROTOCOL.CONTRACTS[chainId as keyof typeof PROTOCOL.CONTRACTS] || PROTOCOL.CONTRACTS[8453];

    // Use centralized vault contract hook for data reading
    const {
        userBalanceETH: realVaultBalanceETH,
        pendingWithdrawalShares: realPendingShares,
        pendingWithdrawalETH: realPendingETH,
        activeStrikePrice,
        activeExpiry,
        lastEpochYield
    } = useVaultContract({ address: isConnected ? address : undefined });

    const realWalletBalanceETH = ethBalance ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)) : 0;

    const ethPrice = marketData?.price || DEMO_DATA.ETH_PRICE;
    const priceChange = marketData?.change24h || 0;

    const realAPY = lastEpochYield
        ? (Number(lastEpochYield) / 10000) * 52 * 100
        : PROTOCOL.APY;

    const currentAPY = parseFloat(realAPY.toFixed(2));

    const rawStrike = activeStrikePrice ? Number(activeStrikePrice) : 0;
    const realStrikePrice = rawStrike > 1000000 ? rawStrike / 1000000 : rawStrike;

    const realExpiryDate = activeExpiry ? new Date(Number(activeExpiry) * 1000) : undefined;

    const realVaultBalanceUSD = realVaultBalanceETH * ethPrice;
    const realWalletBalanceUSD = realWalletBalanceETH * ethPrice;

    // Estimated monthly earnings based on APY
    const realMonthlyEarningsUSD = (realVaultBalanceUSD * (currentAPY / 100)) / 12;

    const isPreviewMode = !isConnected;

    // ------------------------------------------------------------------
    // MAPPING LOGIC (Switch between Demo vs Real)
    // ------------------------------------------------------------------

    // 1. Balances
    const vaultBalanceETH = isPreviewMode ? demoState.vaultBalanceETH : realVaultBalanceETH;
    const vaultBalanceUSD = isPreviewMode ? demoState.vaultBalanceETH * ethPrice : realVaultBalanceUSD;

    const walletBalanceETH = isPreviewMode ? demoState.walletBalanceETH : realWalletBalanceETH;
    const walletBalanceUSD = isPreviewMode ? demoState.walletBalanceETH * ethPrice : realWalletBalanceUSD;

    // 2. Withdrawal Queue
    const pendingWithdrawalShares = isPreviewMode ? (demoState.pendingWithdrawalETH > 0 ? 1 : 0) : realPendingShares;
    const pendingWithdrawalETH = isPreviewMode ? demoState.pendingWithdrawalETH : realPendingETH;

    // 3. Strategy Data
    const displayedStrikePrice = isPreviewMode
        ? (ethPrice ? Math.floor(ethPrice * PROTOCOL.VAULT.STRIKE_PERCENTAGE / 50) * 50 : 0)
        : (realStrikePrice > 0 ? realStrikePrice : 0);

    const vaultExpiry = isPreviewMode
        ? (demoState.withdrawalReadyTimestamp ? new Date(demoState.withdrawalReadyTimestamp) : undefined)
        : realExpiryDate;

    // 4. Earnings
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
        displayedStrikePrice,
        vaultExpiry,
        walletBalanceETH,
        walletBalanceUSD,
        monthlyEarningsUSD,
        totalEarningsUSD,
        demoDeposit,
        demoWithdraw,
        demoClaim,
        demoCancel, // Export new cancel function
        demoReset,
        contracts,
        chainId,
    };
}
