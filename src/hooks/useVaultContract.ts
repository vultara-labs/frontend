"use client";

import { useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseEther, formatUnits } from "viem";
import { toast } from "sonner";
import { PROTOCOL, VULTARA_ETH_VAULT_ABI } from "@/constants";

interface UseVaultContractOptions {
    address?: `0x${string}`;
    onSuccess?: () => void;
}

/**
 * Centralized hook for all Vultara Vault contract interactions
 * Handles deposits, withdrawals, and balance queries
 */
export function useVaultContract({ address }: UseVaultContractOptions = {}) {
    const chainId = useChainId();
    const contracts = PROTOCOL.CONTRACTS[chainId as keyof typeof PROTOCOL.CONTRACTS] || PROTOCOL.CONTRACTS[84532];

    // Contract write hook
    const {
        writeContract,
        data: txHash,
        isPending: isWritePending,
        reset: resetWrite
    } = useWriteContract();

    // Transaction receipt
    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash: txHash });

    // Read user's vault balance (shares)
    const { data: userShares, refetch: refetchBalance } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "getUserBalance",
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    // Convert shares to assets (ETH value)
    const { data: userAssets } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "convertToAssets",
        args: userShares ? [userShares] : undefined,
        query: { enabled: !!userShares }
    });

    // Check pending withdrawals
    const { data: pendingShares, refetch: refetchPending } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "pendingWithdrawals",
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    // Contract Strategy State
    const { data: activeStrikePrice } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "activeStrikePrice",
    });

    const { data: activeExpiry } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "activeExpiry",
    });

    const { data: lastEpochYield } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "lastEpochYield",
    });

    // === ACTIONS ===

    const deposit = async (amountEth: number) => {
        if (!address) {
            toast.error("Please connect your wallet");
            return false;
        }

        try {
            const amountWei = parseEther(amountEth.toString());
            toast.loading("Depositing ETH to Vault...");

            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "deposit",
                value: amountWei,
            });
            return true;
        } catch (_) {
            toast.dismiss();
            toast.error("Transaction failed");
            return false;
        }
    };

    const scheduleWithdraw = async (amountEth: number, maxShares?: bigint) => {
        if (!address) {
            toast.error("Please connect your wallet");
            return false;
        }

        try {
            let sharesToWithdraw: bigint;

            // If near max (99.9%), use actual shares to avoid rounding issues
            const balance = userShares ? parseFloat(formatUnits(userShares as bigint, 18)) : 0;
            if (amountEth >= balance * 0.999 && maxShares) {
                sharesToWithdraw = maxShares;
            } else {
                sharesToWithdraw = parseEther(amountEth.toString());
            }

            toast.loading("Scheduling Withdrawal...");

            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "scheduleWithdraw",
                args: [sharesToWithdraw],
            });
            return true;
        } catch (_) {
            toast.dismiss();
            toast.error("Transaction failed");
            return false;
        }
    };

    const claimWithdraw = async () => {
        try {
            toast.loading("Claiming funds...");

            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "claimWithdraw",
                args: [],
            });
            return true;
        } catch (_) {
            toast.dismiss();
            return false;
        }
    };

    const cancelWithdraw = async () => {
        try {
            toast.loading("Cancelling request...");

            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "cancelWithdraw",
                args: [],
            });
            return true;
        } catch (_) {
            toast.dismiss();
            return false;
        }
    };

    // Computed values
    const userBalanceETH = userAssets
        ? parseFloat(formatUnits(userAssets as bigint, 18))
        : userShares
            ? parseFloat(formatUnits(userShares as bigint, 18))
            : 0;

    // Convert pending shares to pending ETH value (assets)
    const { data: pendingAssets } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "convertToAssets",
        args: pendingShares ? [pendingShares] : undefined,
        query: { enabled: !!pendingShares }
    });

    const pendingWithdrawalShares = pendingShares
        ? parseFloat(formatUnits(pendingShares as bigint, 18))
        : 0;

    const pendingWithdrawalETH = pendingAssets
        ? parseFloat(formatUnits(pendingAssets as bigint, 18))
        : pendingWithdrawalShares; // Fallback 1:1 if conversion fails

    return {
        // Contract info
        vaultAddress: contracts.ETH_VAULT,
        chainId,

        // Strategy Data
        activeStrikePrice: activeStrikePrice as bigint | undefined,
        activeExpiry: activeExpiry as bigint | undefined,
        lastEpochYield: lastEpochYield as bigint | undefined,

        // User balances
        userShares: userShares as bigint | undefined,
        userBalanceETH,
        pendingWithdrawalShares,
        pendingWithdrawalETH,

        // Transaction state
        txHash,
        isPending: isWritePending || isConfirming,
        isConfirmed,

        // Actions
        deposit,
        scheduleWithdraw,
        claimWithdraw,
        cancelWithdraw,

        // Utilities
        refetchBalance,
        refetchPending,
        resetWrite,
    };
}
