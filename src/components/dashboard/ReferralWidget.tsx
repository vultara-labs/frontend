"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Copy, Check, Gift, Trophy, Share } from "@phosphor-icons/react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { IconBox } from "@/components/ui/IconBox";

interface ReferralData {
    referralCode: string;
    referralCount: number;
    totalEarnings: number;
    tier: "bronze" | "silver" | "gold" | "diamond";
}

const REFERRAL_TIERS = {
    bronze: { min: 0, bonus: 5, color: "var(--warning)", label: "Bronze" },
    silver: { min: 5, bonus: 7.5, color: "var(--text-secondary)", label: "Silver" },
    gold: { min: 15, bonus: 10, color: "var(--volt)", label: "Gold" },
    diamond: { min: 50, bonus: 15, color: "var(--info)", label: "Diamond" },
};

/**
 * Referral System Widget
 * Generates referral codes and tracks rewards
 */
export function ReferralWidget({ className = "" }: { className?: string }) {
    const { address, isConnected } = useAccount();
    const [referralData, setReferralData] = useState<ReferralData | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Generate or retrieve referral data
        if (isConnected && address) {
            // In production, this would come from a backend
            // For demo, generate deterministic code from address
            const code = `VULT-${address.slice(2, 8).toUpperCase()}`;

            // Demo data - would be fetched from backend
            setTimeout(() => {
                setReferralData({
                    referralCode: code,
                    referralCount: Math.floor(Math.random() * 10),
                    totalEarnings: Math.random() * 50,
                    tier: "bronze",
                });
            }, 0);
        } else {
            // Demo mode referral
            setTimeout(() => {
                setReferralData({
                    referralCode: "VULT-DEMO01",
                    referralCount: 3,
                    totalEarnings: 12.50,
                    tier: "bronze",
                });
            }, 0);
        }
    }, [address, isConnected]);

    const handleCopy = async () => {
        if (!referralData) return;

        const referralLink = `https://vultara.xyz/?ref=${referralData.referralCode}`;

        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            toast.success("Referral link copied!");
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            toast.error("Failed to copy");
        }
    };

    const handleShare = async () => {
        if (!referralData) return;

        const referralLink = `https://vultara.xyz/?ref=${referralData.referralCode}`;
        const shareText = `Earn yield on your ETH with Vultara! Use my referral link for a bonus: ${referralLink}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: "Vultara Referral", text: shareText, url: referralLink });
            } catch (e) {
                // User cancelled or not supported
            }
        } else {
            handleCopy();
        }
    };

    if (!referralData) return null;

    const currentTier = REFERRAL_TIERS[referralData.tier];
    const nextTier = Object.entries(REFERRAL_TIERS).find(
        ([_, t]) => t.min > referralData.referralCount
    );

    return (
        <div className={`p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] ${className}`}>
            <div className="flex items-center gap-3 mb-6">
                <IconBox icon={Users} color="var(--info)" size="md" iconWeight="fill" />
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">Referral Program</h3>
                    <p className="text-[10px] text-[var(--text-tertiary)]">Invite friends, earn rewards</p>
                </div>
                {!isConnected && (
                    <span className="ml-auto px-2 py-0.5 rounded text-[10px] bg-[var(--volt)]/10 text-[var(--volt)] font-medium">Demo</span>
                )}
            </div>

            {/* Referral Code */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] mb-4">
                <p className="text-[10px] text-[var(--text-tertiary)] mb-2">Your Referral Code</p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold font-mono text-white tracking-wider">
                        {referralData.referralCode}
                    </span>
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={handleCopy}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg bg-[var(--volt)]/10 text-[var(--volt)] hover:bg-[var(--volt)]/20 transition-colors"
                        >
                            {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
                        </motion.button>
                        <motion.button
                            onClick={handleShare}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg bg-[var(--info)]/10 text-[var(--info)] hover:bg-[var(--info)]/20 transition-colors"
                        >
                            <Share size={16} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] text-center">
                    <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Referrals</p>
                    <p className="text-lg font-bold text-white font-mono">{referralData.referralCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] text-center">
                    <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Earned</p>
                    <p className="text-lg font-bold text-[var(--success)] font-mono">
                        ${referralData.totalEarnings.toFixed(2)}
                    </p>
                </div>
                <div className="p-3 rounded-xl border text-center"
                    style={{
                        backgroundColor: `color-mix(in srgb, ${currentTier.color} 5%, transparent)`,
                        borderColor: `color-mix(in srgb, ${currentTier.color} 20%, transparent)`,
                    }}
                >
                    <p className="text-[10px] text-[var(--text-tertiary)] mb-1">Tier</p>
                    <p className="text-sm font-bold capitalize" style={{ color: currentTier.color }}>
                        {currentTier.label}
                    </p>
                </div>
            </div>

            {/* Tier Progress */}
            {nextTier && (
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Trophy size={14} className="text-[var(--text-tertiary)]" />
                            <span className="text-[10px] text-[var(--text-tertiary)]">
                                Next: {nextTier[1].label} ({nextTier[1].bonus}% bonus)
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-secondary)]">
                            {referralData.referralCount}/{nextTier[1].min}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all"
                            style={{
                                width: `${(referralData.referralCount / nextTier[1].min) * 100}%`,
                                backgroundColor: nextTier[1].color,
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Rewards Info */}
            <div className="mt-4 p-3 rounded-xl bg-[var(--volt)]/5 border border-[var(--volt)]/20">
                <div className="flex items-center gap-2 mb-1">
                    <Gift size={14} className="text-[var(--volt)]" />
                    <span className="text-xs font-bold text-[var(--volt)]">Referral Rewards</span>
                </div>
                <p className="text-[10px] text-[var(--text-secondary)]">
                    Earn {currentTier.bonus}% of your referrals&apos; deposit fees. Both you and your friend get a bonus!
                </p>
            </div>
        </div>
    );
}
