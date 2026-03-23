"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, CaretRight, ShieldCheck } from "@phosphor-icons/react";
import { useWalletConnection } from "@/hooks";

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
    const { connect, connectors, isConnecting } = useWalletConnection();

    const modalRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, handleKeyDown]);

    // Focus trap: keep Tab cycling within the modal
    useEffect(() => {
        if (!isOpen) return;
        const modal = modalRef.current;
        if (!modal) return;

        const focusable = modal.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable[0]?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first?.focus();
            }
        };

        modal.addEventListener("keydown", handleTab);
        return () => modal.removeEventListener("keydown", handleTab);
    }, [isOpen]);

    // Map connector IDs to properly brand assets
    const getWalletInfo = (connector: { id: string; name: string }) => {
        const id = connector.id.toLowerCase();
        const name = connector.name.toLowerCase();

        if (id.includes("coinbase") || name.includes("coinbase")) {
            return { name: "Coinbase Wallet", icon: "/logos/wallet/coinbase.svg" };
        }
        if (id.includes("phantom") || name.includes("phantom")) {
            return { name: "Phantom", icon: "/logos/wallet/phantom.svg" };
        }
        if (id.includes("brave") || name.includes("brave")) {
            return { name: "Brave Wallet", icon: "/logos/wallet/brave.png" };
        }
        if (id.includes("metamask") || name.includes("metamask") || id.includes("injected")) {
            return { name: "MetaMask", icon: "/logos/wallet/metamask.svg" };
        }
        if (id.includes("walletconnect")) {
            return { name: "WalletConnect", icon: "/logos/wallet/walletconnect.svg" };
        }
        return { name: connector.name, icon: "/logos/wallet/metamask.svg" }; // Generic fallback
    };

    // Deduplicate connectors based on resolved name
    const uniqueConnectors = connectors.filter((connector, index, self) => {
        const info = getWalletInfo(connector);
        // Find the first connector that resolves to this name
        const firstIndex = self.findIndex(c => getWalletInfo(c).name === info.name);
        return index === firstIndex;
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Connect wallet"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[var(--obsidian-surface)] border border-[var(--border-medium)] rounded-[2rem] shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                    <Wallet size={24} className="text-[var(--volt)]" weight="duotone" />
                                    Connect
                                </h2>
                                <p className="text-xs text-[var(--text-secondary)] mt-1">Select your preferred wallet</p>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-[var(--text-secondary)] hover:text-white transition-colors"
                            >
                                <X size={16} weight="bold" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-4 space-y-3">
                            {uniqueConnectors.map((connector) => {
                                const { name, icon } = getWalletInfo(connector);
                                return (
                                    <button
                                        key={connector.id}
                                        onClick={() => {
                                            connect(connector.id);
                                            onClose();
                                        }}
                                        disabled={isConnecting}
                                        className="w-full group relative p-4 rounded-xl bg-[var(--obsidian-base)] border border-[var(--border-subtle)] hover:border-[var(--volt)] hover:bg-white/[0.02] flex items-center justify-between text-left disabled:opacity-50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center overflow-hidden p-2">
                                                <Image src={icon} alt={name} width={24} height={24} className="w-full h-full object-contain" unoptimized />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white group-hover:text-[var(--volt)]">
                                                    {name}
                                                </h3>
                                                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                                                    {name.includes('Coinbase') ? 'Smart Wallet' : 'Browser Extension'}
                                                </p>
                                            </div>
                                        </div>
                                        <CaretRight size={16} className="text-[var(--text-tertiary)] group-hover:text-[var(--volt)]" weight="bold" />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-black/20 border-t border-[var(--border-subtle)]">
                            <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)] justify-center">
                                <span className="flex items-center gap-1.5">
                                    <ShieldCheck size={14} className="text-[var(--success)]" weight="fill" />
                                    Audited
                                </span>
                                <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
                                <span className="flex items-center gap-1.5">
                                    <Image src="/logos/wallet/base.svg" alt="Base" width={14} height={14} className="w-3.5 h-3.5" unoptimized />
                                    Base Network
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
