"use client";

import { CaretRight, Wallet, Eye } from "@phosphor-icons/react";

interface WalletCardProps {
    isConnectedSafe: boolean;
    isWrongNetwork: boolean;
    isPreviewMode: boolean;
    walletBalanceETH: number;
    formattedBalance: string;
    formattedAddress: string;
    switchNetwork: () => void;
    openWalletModal: () => void;
}

export function WalletCard({
    isConnectedSafe,
    isWrongNetwork,
    isPreviewMode,
    walletBalanceETH,
    formattedBalance,
    formattedAddress,
    switchNetwork,
    openWalletModal,
}: WalletCardProps) {
    return (
        <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--volt)]/20 to-transparent blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={`relative p-5 rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${isWrongNetwork
                ? "bg-red-500/5 border-red-500/30 hover:bg-red-500/10"
                : isPreviewMode
                    ? "bg-[var(--warning)]/5 border-[var(--warning)]/30 hover:bg-[var(--warning)]/10"
                    : "bg-[var(--obsidian-surface)] border-[var(--border-medium)]"
                }`}>
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl -mr-10 -mt-10 ${isWrongNetwork
                    ? "bg-red-500/20"
                    : isPreviewMode
                        ? "bg-[var(--warning)]/20"
                        : "bg-[var(--volt)]/10"}`}
                />

                <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isWrongNetwork
                        ? "text-red-500"
                        : isPreviewMode
                            ? "text-[var(--warning)]"
                            : "text-[var(--text-secondary)]"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isWrongNetwork
                            ? "bg-red-500 animate-pulse"
                            : isConnectedSafe
                                ? "bg-[var(--success)] shadow-[0_0_8px_var(--success)]"
                                : "bg-[var(--warning)] animate-pulse"}`}
                        />
                        {isWrongNetwork ? "Network Error" : isConnectedSafe ? "Connected" : "Preview Mode"}
                    </span>
                    {isWrongNetwork ? (
                        <Wallet size={18} className="text-red-500" />
                    ) : isPreviewMode ? (
                        <Eye size={18} className="text-[var(--warning)]" />
                    ) : (
                        <Wallet size={18} className="text-[var(--text-tertiary)]" />
                    )}
                </div>

                <div className="mb-1">
                    {isWrongNetwork ? (
                        <div>
                            <p className="text-xs text-[var(--text-secondary)] mb-3 leading-relaxed">
                                Wallet connected to wrong network.
                            </p>
                            <button
                                onClick={switchNetwork}
                                className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Switch to Base
                            </button>
                        </div>
                    ) : isPreviewMode ? (
                        <div>
                            <p className="text-3xl font-black text-white tracking-tight mb-3">{walletBalanceETH.toFixed(2)} ETH</p>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-[var(--warning)] font-bold bg-[var(--warning)]/10 px-2 py-1.5 rounded border border-[var(--warning)]/20">
                                    Demo Data
                                </span>
                                <button
                                    onClick={openWalletModal}
                                    className="text-[10px] font-bold bg-[var(--warning)] text-black px-3 py-1.5 rounded hover:brightness-110 transition-all flex items-center gap-1"
                                >
                                    Connect <CaretRight weight="bold" />
                                </button>
                            </div>
                        </div>
                    ) : !isConnectedSafe ? (
                        <button
                            onClick={openWalletModal}
                            className="w-full py-2.5 rounded-xl bg-[var(--volt)] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                        >
                            Connect
                        </button>
                    ) : (
                        <div>
                            <p className="text-3xl font-black text-white tracking-tight mb-1">{formattedBalance}</p>
                            <p className="text-[10px] text-[var(--text-tertiary)] font-mono truncate px-2 py-1 rounded bg-black/20 inline-block border border-white/5">
                                {formattedAddress}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
