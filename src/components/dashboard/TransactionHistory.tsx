"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Clock, Spinner } from "@phosphor-icons/react";
import { useAccount } from "wagmi";

// Simple time ago formatter (no external deps)
function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

interface Transaction {
    type: "deposit" | "withdraw";
    amount: string;
    timestamp: Date;
    txHash: string;
}

interface TransactionHistoryProps {
    className?: string;
    limit?: number;
}

/**
 * Transaction History component showing recent deposits and withdrawals
 * Uses demo data when wallet not connected, real events when connected
 */
export function TransactionHistory({ className = "", limit = 5 }: TransactionHistoryProps) {
    const { isConnected, address } = useAccount();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);

            // Demo data for preview mode
            if (!isConnected || !address) {
                setTransactions([
                    { type: "deposit", amount: "0.5", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), txHash: "0x1234...abcd" },
                    { type: "deposit", amount: "0.25", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), txHash: "0x5678...efgh" },
                    { type: "withdraw", amount: "0.1", timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), txHash: "0x9abc...ijkl" },
                ]);
                setLoading(false);
                return;
            }

            // TODO: Implement real event fetching from contract
            // For now, show empty state for connected wallets without history
            // In production, use viem's getLogs to fetch DepositReceived and WithdrawProcessed events

            try {
                // Placeholder for real implementation:
                // const publicClient = createPublicClient({ chain: baseSepolia, transport: http() });
                // const logs = await publicClient.getLogs({
                //     address: VAULT_ADDRESS,
                //     event: parseAbiItem('event DepositReceived(address indexed user, uint256 ethAmount, uint256 shares)'),
                //     args: { user: address },
                //     fromBlock: 'earliest'
                // });

                setTransactions([]);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [isConnected, address]);

    const truncateHash = (hash: string) => {
        if (hash.length <= 12) return hash;
        return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
    };

    if (loading) {
        return (
            <div className={`p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] ${className}`}>
                <div className="flex items-center justify-center py-8">
                    <Spinner size={24} className="animate-spin text-[var(--text-tertiary)]" />
                </div>
            </div>
        );
    }

    return (
        <div className={`p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] ${className}`}>
            <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-[var(--text-tertiary)]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Recent Activity</h3>
                {!isConnected && (
                    <span className="ml-auto px-2 py-0.5 rounded text-xs bg-[var(--volt)]/10 text-[var(--volt)] font-medium">Demo</span>
                )}
            </div>

            {transactions.length === 0 ? (
                <div className="py-8 text-center">
                    <p className="text-sm text-[var(--text-tertiary)]">No transactions yet</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">Your deposits and withdrawals will appear here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {transactions.slice(0, limit).map((tx, i) => (
                        <motion.div
                            key={tx.txHash}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] hover:bg-white/[0.04] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "deposit"
                                    ? "bg-[var(--success)]/10 text-[var(--success)]"
                                    : "bg-[var(--warning)]/10 text-[var(--warning)]"
                                    }`}>
                                    {tx.type === "deposit" ? (
                                        <ArrowDownLeft size={16} weight="bold" />
                                    ) : (
                                        <ArrowUpRight size={16} weight="bold" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                                    <p className="text-xs text-[var(--text-tertiary)]">
                                        {formatTimeAgo(tx.timestamp)}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold font-mono ${tx.type === "deposit" ? "text-[var(--success)]" : "text-[var(--warning)]"
                                    }`}>
                                    {tx.type === "deposit" ? "+" : "-"}{tx.amount} ETH
                                </p>
                                <p className="text-xs text-[var(--text-tertiary)] font-mono">
                                    {truncateHash(tx.txHash)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
