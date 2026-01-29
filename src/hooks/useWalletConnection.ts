"use client";

import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from "wagmi";
import { injected } from "wagmi/connectors";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { formatAddress } from "@/lib/formatters";

export function useWalletConnection() {
    const { address, isConnected } = useAccount();
    const { connect, connectors, isPending: isConnecting } = useConnect();
    const { disconnect } = useDisconnect();
    const chainId = useChainId();

    const { data: ethBalance } = useBalance({
        address,
        chainId, // Dynamic: uses connected chain (mainnet or testnet)
    });

    const handleConnect = (connectorId?: string) => {
        // Find connector by ID or default to first available (usually injected/metamask)
        const connector = connectorId
            ? connectors.find(c => c.id === connectorId)
            : connectors[0];

        if (!connector) {
            toast.error("Wallet not found");
            return;
        }

        connect(
            { connector },
            {
                onSuccess: () => {
                    toast.success("Wallet Connected", { description: "Welcome back to Vultara." });
                },
                onError: (err) => {
                    // Don't show error if user just rejected the request
                    if (err.message.includes("User rejected")) return;
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

    const formattedBalance = ethBalance
        ? `${parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)).toFixed(4)} ETH`
        : "0.00 ETH";

    return {
        address,
        isConnected,
        isConnecting,
        ethBalance,
        formattedAddress,
        formattedBalance,
        connectors, // Return list of available wallets
        connect: handleConnect,
        disconnect: handleDisconnect,
    };
}
