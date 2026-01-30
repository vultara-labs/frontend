"use client";

import { useAccount, useConnect, useDisconnect, useBalance, useChainId, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { formatAddress } from "@/lib/formatters";
import { useState, useEffect } from "react";

export function useWalletConnection() {
    const { address, isConnected: wagmiIsConnected, chainId: accountChainId } = useAccount();
    const { connect, connectors, isPending: isConnecting } = useConnect();
    const { disconnect } = useDisconnect();
    const configChainId = useChainId();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isConnected = mounted && wagmiIsConnected;
    const currentChainId = accountChainId ?? configChainId;

    const { data: ethBalance } = useBalance({
        address,
        chainId: currentChainId,
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

    const { switchChain } = useSwitchChain();

    // Check if connected to the wrong network (not Base)
    // base.id is 8453
    const isWrongNetwork = isConnected && currentChainId !== 8453;

    const switchNetwork = () => {
        switchChain({ chainId: 8453 }); // Switch to Base
    };

    return {
        address,
        isConnected,
        isConnecting,
        isWrongNetwork,
        chainId: currentChainId,
        ethBalance,
        formattedAddress,
        formattedBalance,

        connectors, // Return list of available wallets
        connect: handleConnect,
        disconnect: handleDisconnect,
        switchNetwork,
    };
}
