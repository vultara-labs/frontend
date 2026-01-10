"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { formatAddress } from "@/lib/formatters";

export function useWalletConnection() {
    const { address, isConnected } = useAccount();
    const { connect, isPending: isConnecting } = useConnect();
    const { disconnect } = useDisconnect();
    const { data: balance } = useBalance({ address });

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
    const formattedBalance = balance
        ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}`
        : "Loading...";

    return {
        address,
        isConnected,
        isConnecting,
        balance,
        formattedAddress,
        formattedBalance,
        connect: handleConnect,
        disconnect: handleDisconnect,
    };
}
