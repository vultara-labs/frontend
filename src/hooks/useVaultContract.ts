"use client";

import { useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { parseEther, formatUnits } from "viem";
import { toast } from "sonner";
import { PROTOCOL, VULTARA_ETH_VAULT_ABI } from "@/constants";

interface UseVaultContractOptions {
    address?: `0x${string}`;
    onSuccess?: () => void;
}

export function useVaultContract({ address }: UseVaultContractOptions = {}) {
    const chainId = useChainId();
    const contracts = PROTOCOL.CONTRACTS[chainId as keyof typeof PROTOCOL.CONTRACTS] || PROTOCOL.CONTRACTS[8453];

    const {
        writeContract,
        data: txHash,
        isPending: isWritePending,
        reset: resetWrite
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash: txHash });

    const { data: userShares, refetch: refetchBalance } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "getUserBalance",
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

    const { data: userAssets } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "convertToAssets",
        args: userShares ? [userShares] : undefined,
        query: { enabled: !!userShares }
    });

    const { data: pendingShares, refetch: refetchPending } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "pendingWithdrawals",
        args: address ? [address] : undefined,
        query: { enabled: !!address }
    });

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

            const sharesBalance = userShares ? (userShares as bigint) : BigInt(0);
            const withdrawAmountWei = parseEther(amountEth.toString());

            const balanceWei = parseEther(userBalanceETH.toString());
            const dust = parseEther("0.000000000000001"); // 1000 wei

            if (withdrawAmountWei >= balanceWei - dust && maxShares) {
                sharesToWithdraw = maxShares;
            } else {
                sharesToWithdraw = withdrawAmountWei;
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

    const userBalanceETH = userAssets
        ? parseFloat(formatUnits(userAssets as bigint, 18))
        : userShares
            ? parseFloat(formatUnits(userShares as bigint, 18))
            : 0;

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
        : pendingWithdrawalShares;

    return {
        vaultAddress: contracts.ETH_VAULT,
        chainId,

        activeStrikePrice: activeStrikePrice as bigint | undefined,
        activeExpiry: activeExpiry as bigint | undefined,
        lastEpochYield: lastEpochYield as bigint | undefined,

        userShares: userShares as bigint | undefined,
        userBalanceETH,
        pendingWithdrawalShares,
        pendingWithdrawalETH,

        txHash,
        isPending: isWritePending || isConfirming,
        isConfirmed,

        deposit,
        scheduleWithdraw,
        claimWithdraw,
        cancelWithdraw,

        refetchBalance,
        refetchPending,
        resetWrite,
    };
}
