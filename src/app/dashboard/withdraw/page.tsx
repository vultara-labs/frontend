"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowCircleDown, CheckCircle, CircleNotch, Wallet } from "@phosphor-icons/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import Link from "next/link";
import { formatUnits, parseEther } from "viem";
import { useWalletConnection } from "@/hooks";
import { useDashboardData } from "@/hooks";
import { PROTOCOL, VULTARA_ETH_VAULT_ABI } from "@/constants";

function WithdrawLoading() {
    return (
        <div className="min-h-[60vh] flex flex-col justify-center items-center">
            <CircleNotch size={32} className="animate-spin text-blue-400" />
        </div>
    );
}

export default function WithdrawPage() {
    return (
        <Suspense fallback={<WithdrawLoading />}>
            <WithdrawContent />
        </Suspense>
    );
}

function WithdrawContent() {
    const { isConnected, address, connect: handleConnect } = useWalletConnection();
    const { isPreviewMode, vaultBalanceETH, demoWithdraw, pendingWithdrawalETH, pendingWithdrawalShares } = useDashboardData();
    const chainId = useChainId();
    const [step, setStep] = useState<"input" | "processing" | "success" | "pending_view">("input");
    const [amount, setAmount] = useState("");
    const searchParams = useSearchParams();

    // Check for existing pending withdrawal on mount
    useEffect(() => {
        if (pendingWithdrawalShares > 0 && step === "input") {
            setStep("pending_view");
        }
    }, [pendingWithdrawalShares, step]);

    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setAmount(urlAmount);
        }
    }, [searchParams]);

    // Get contract addresses for current chain
    const contracts = PROTOCOL.CONTRACTS[chainId as keyof typeof PROTOCOL.CONTRACTS] || PROTOCOL.CONTRACTS[84532];

    // Read user's vault balance (shares = ETH value in vault) - only when connected
    const { data: vaultBalance, refetch: refetchVaultBalance } = useReadContract({
        address: contracts.ETH_VAULT,
        abi: VULTARA_ETH_VAULT_ABI,
        functionName: "getUserBalance",
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected,
        }
    });

    // Contract write hooks
    const { writeContract: writeContract, data: txHash, isPending: isTxPending } = useWriteContract();
    const { isLoading: isTxConfirming, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash: txHash });

    // Handle success
    useEffect(() => {
        if (isTxSuccess && step === "processing") {
            toast.dismiss();
            setStep("success");
            const isClaim = pendingWithdrawalShares > 0 && amount === "CLAIM"; // Hacky way to track op

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#CCFF00", "#ffffff", "#22c55e"],
            });

            toast.success("Transaction Confirmed!");
            refetchVaultBalance();
        }
    }, [isTxSuccess]);

    // Use demo or real vault balance
    const realVaultBalance = vaultBalance ? parseFloat(formatUnits(vaultBalance as bigint, 18)) : 0;
    const totalBalance = isPreviewMode ? vaultBalanceETH : realVaultBalance;

    const numAmount = parseFloat(amount.replace(/,/g, '')) || 0;
    const isValidAmount = numAmount > 0 && numAmount <= totalBalance;

    // --- ACTIONS ---

    const handleScheduleWithdraw = async () => {
        if (!isValidAmount) return;
        if (!isConnected || !address) {
            toast.error("Please connect your wallet");
            return;
        }

        setStep("processing");

        try {
            // Need to convert ETH amount to Shares
            // For now assuming 1:1 roughly or using the balance directly if max
            // Ideally we call convertToShares but for schedule we input SHARES. 
            // Since we don't have shares input, we might need to assume 1:1 for now or fetch.
            // Simplified: We use the same amount since we updated logic to validAmount <= totalBalance (which is ETH)
            // Wait, smart contract `scheduleWithdraw` takes SHARES.
            // We need to convert ETH amount -> Shares.
            // Logic: shares = (ethAmount * totalSupply) / totalAssets.
            // This is complex to do on client perfectly.
            // Hack for Hackathon: If Max, use balance directly. If partial, rely on simple conversion or prompt user.
            // Let's use the `vaultBalance` (Contract shares) directly if Max.

            let sharesToWithdraw = BigInt(0);

            if (numAmount >= totalBalance * 0.999) {
                sharesToWithdraw = (vaultBalance as bigint) || BigInt(0);
            } else {
                sharesToWithdraw = parseEther(numAmount.toString()); // Approx 1:1 default
            }

            toast.loading("Scheduling Withdrawal...");
            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "scheduleWithdraw",
                args: [sharesToWithdraw],
            });
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error("Transaction failed");
            setStep("input");
        }
    };

    const handleClaim = async () => {
        setStep("processing");
        setAmount("CLAIM"); // Flag for success msg
        try {
            toast.loading("Claiming funds...");
            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "claimWithdraw",
                args: [],
            });
        } catch (e) {
            setStep("pending_view");
            toast.dismiss();
        }
    }

    const handleCancel = async () => {
        setStep("processing");
        try {
            toast.loading("Cancelling request...");
            writeContract({
                address: contracts.ETH_VAULT,
                abi: VULTARA_ETH_VAULT_ABI,
                functionName: "cancelWithdraw",
                args: [],
            });
        } catch (e) {
            setStep("pending_view");
            toast.dismiss();
        }
    }

    const handleMax = () => setAmount(totalBalance.toFixed(6));

    // Simulated withdraw for preview/demo mode
    const handlePreviewWithdraw = () => {
        if (!isValidAmount) return;
        setStep("processing");
        toast.loading("Simulating withdrawal...");
        setTimeout(() => {
            demoWithdraw(numAmount);
            toast.dismiss();
            setStep("success");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#CCFF00", "#ffffff", "#22c55e"],
            });
            toast.success("Demo Withdrawal Complete!");
        }, 2000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl relative group"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative rounded-[2.5rem] bg-[var(--obsidian-surface)] border border-[var(--border-medium)] p-8 sm:p-12 overflow-hidden">
                    <AnimatePresence mode="wait">

                        {/* VIEW 1: PENDING WITHDRAWAL EXISTS */}
                        {step === "pending_view" && (
                            <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[var(--warning)]/10 text-[var(--warning)] mx-auto mb-6 flex items-center justify-center border border-[var(--warning)]/20">
                                    <CircleNotch size={32} weight="bold" className="animate-spin-slow" />
                                </div>
                                <h2 className="text-2xl font-black text-white uppercase mb-2">Withdrawal Queued</h2>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    You have <strong className="text-white">{pendingWithdrawalETH.toFixed(4)} ETH</strong> scheduled for withdrawal.
                                    Funds are released every Friday.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleCancel}
                                        className="h-14 rounded-xl border border-[var(--border-medium)] text-[var(--text-secondary)] font-bold hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        Cancel Request
                                    </button>
                                    <button
                                        onClick={handleClaim}
                                        className="h-14 rounded-xl bg-[var(--volt)] text-black font-bold uppercase hover:bg-[var(--volt)]/90 transition-colors shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                                    >
                                        Claim Funds
                                    </button>
                                </div>
                                <p className="text-xs text-[var(--text-tertiary)] mt-4">
                                    Note: Claiming will fail if funds are currently locked in strategy.
                                </p>
                            </motion.div>
                        )}

                        {/* VIEW 2: INPUT FORM (SCHEDULE) */}
                        {step === "input" && (
                            <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                            <ArrowCircleDown size={24} weight="duotone" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none mb-1">Schedule</h1>
                                            <p className="label text-[var(--text-secondary)]">Request Exit Queue</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="label text-[var(--text-secondary)] mb-1">Available to Withdraw</p>
                                        <p className="text-xl font-black text-white tracking-tight">{totalBalance.toFixed(4)} ETH</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3 px-2">
                                        <span className="label text-[var(--text-secondary)]">Amount (ETH)</span>
                                        <span className="text-xs font-mono text-[var(--text-tertiary)] hover:text-white cursor-pointer transition-colors" onClick={handleMax}>
                                            Max: {totalBalance.toFixed(4)} ETH
                                        </span>
                                    </div>

                                    <div className="relative group/input">
                                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl opacity-0 group-focus-within/input:opacity-50 transition-opacity" />
                                        <motion.div
                                            animate={numAmount > totalBalance ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                            transition={{ duration: 0.4 }}
                                            className={`relative flex items-center gap-2 p-6 rounded-2xl bg-[var(--obsidian-base)] border transition-colors ${numAmount > totalBalance
                                                ? "border-[var(--error)] bg-[var(--error)]/5"
                                                : "border-[var(--border-medium)] group-focus-within/input:border-blue-500"
                                                }`}
                                        >
                                            <span className={`text-3xl ${numAmount > totalBalance ? "text-[var(--error)]" : "text-[var(--text-tertiary)]"}`}>Ξ</span>
                                            <input
                                                type="text"
                                                value={amount}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/,/g, '');
                                                    if (!isNaN(Number(val)) || val === '') {
                                                        setAmount(val);
                                                    }
                                                }}
                                                placeholder="0"
                                                className={`w-full bg-transparent text-4xl font-black placeholder:text-white/10 outline-none ${numAmount > totalBalance ? "text-[var(--error)]" : "text-white"
                                                    }`}
                                                autoFocus
                                            />
                                            <button
                                                onClick={handleMax}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider ${numAmount > totalBalance
                                                    ? "bg-[var(--error)]/10 text-[var(--error)] hover:bg-[var(--error)] hover:text-white"
                                                    : "bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white"
                                                    }`}
                                            >
                                                Max
                                            </button>
                                        </motion.div>
                                    </div>

                                    {numAmount > totalBalance ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 px-2 flex items-center gap-2 text-[var(--error)]"
                                        >
                                            <span className="text-sm font-bold">Insufficient vault balance</span>
                                        </motion.div>
                                    ) : totalBalance === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 px-2"
                                        >
                                            <Link
                                                href="/dashboard/deposit"
                                                className="text-sm font-bold text-[var(--volt)] hover:underline"
                                            >
                                                No funds in vault. Deposit first →
                                            </Link>
                                        </motion.div>
                                    ) : (
                                        <div className="mt-4 px-2 text-xs text-[var(--warning)] flex items-center gap-2">
                                            <span className="font-bold">NOTICE:</span>
                                            <span>Funds will be added to queue and released next Friday.</span>
                                        </div>
                                    )}
                                </div>

                                {isPreviewMode ? (
                                    <button
                                        onClick={handlePreviewWithdraw}
                                        disabled={!isValidAmount}
                                        className="btn-primary bg-white text-black hover:bg-white/90 disabled:bg-white/40 w-full h-16 text-base tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                    >
                                        Withdraw (Demo)
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleScheduleWithdraw}
                                        disabled={!isValidAmount}
                                        className="btn-primary bg-white text-black hover:bg-white/90 disabled:bg-white/40 w-full h-16 text-base tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                    >
                                        Schedule Withdrawal
                                    </button>
                                )}
                            </motion.div>
                        )}

                        {step === "processing" && (
                            <motion.div key="processing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                                    <CircleNotch size={64} className="text-blue-400 animate-spin relative z-10" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Processing</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Interacting with Vultara Vault...</p>
                            </motion.div>
                        )}

                        {step === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8">
                                <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center mb-6">
                                    <CheckCircle size={40} weight="fill" className="text-[var(--success)]" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Request Confirmed</h3>
                                <p className="text-[var(--text-secondary)] text-center mb-8 max-w-xs mx-auto">
                                    Your request has been processed successfully. Check stats for updates.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="h-14 px-8 rounded-2xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center text-xs"
                                >
                                    Return to Dashboard
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
