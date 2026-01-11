"use client";

import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useReadContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { toast } from "sonner";
import { formatUnits, erc20Abi } from "viem";
import { formatAddress } from "@/lib/formatters";

// USDC Contract Addresses
const USDC_CONTRACTS: Record<number, `0x${string}`> = {
    8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet
    84532: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia
};

export function useWalletConnection() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { connect, isPending: isConnecting } = useConnect();
    const { disconnect } = useDisconnect();

    // Native ETH Balance (for Gas) - ensuring chainId is passed
    // FOR HACKATHON DEMO: Force Base Sepolia (84532) to ensure testnet assets are detected
    const { data: ethBalance } = useBalance({
        address,
        chainId: 84532
    });

    // USDC Balance (Core Asset) - Using useReadContract for reliability
    const { data: usdcBalanceRaw } = useReadContract({
        address: USDC_CONTRACTS[chainId],
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && !!USDC_CONTRACTS[chainId],
        }
    });

    const handleConnect = () => {
        connect(
            { connector: injected() },
            {
                onSuccess: () => {
                    toast.success("Wallet Connected", { description: "Welcome back to Vultara." });
                },
                onError: (err) => {
                    toast.error("Connection Failed", { description: err.message });
                },
            }
        );
    };

    const handleDisconnect = () => {
        disconnect();
        toast.info("Wallet Disconnected");
    };

    const formattedAddress = address ? formatAddress(address) : "";

    // Prioritize USDC display for this app (Standard USDC Decimals = 6)
    const formattedBalance = usdcBalanceRaw !== undefined
        ? `${parseFloat(formatUnits(usdcBalanceRaw, 6)).toFixed(2)} USDC`
        : ethBalance
            ? `${parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)).toFixed(4)} ETH`
            : "0.00 USDC";

    return {
        address,
        isConnected,
        isConnecting,
        balance: ethBalance, // Keep raw eth balance accessible
        usdcBalance: usdcBalanceRaw,
        formattedAddress,
        formattedBalance,
        connect: handleConnect,
        disconnect: handleDisconnect,
    };
}
