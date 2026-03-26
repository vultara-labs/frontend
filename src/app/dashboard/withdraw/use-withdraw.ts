"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useWalletConnection, useDashboardData, useVaultContract } from "@/hooks";
import { getAmountValidation } from "@/components/ui";

export function useWithdraw() {
    const { isConnected, address } = useWalletConnection();
    const { isPreviewMode, vaultBalanceETH, demoWithdraw, demoClaim, demoCancel, pendingWithdrawalETH, pendingWithdrawalShares, vaultExpiry } = useDashboardData();

    // View state tracks which main screen is valid generally
    const [view, setView] = useState<"input" | "pending" | "success">("input");
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();

    // Force re-render for countdown — only tick when countdown is visible
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        if (view !== "pending") return;
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, [view]);

    const vault = useVaultContract({ address });

    // Auto-detect view based on queue status
    useEffect(() => {
        // If we have pending shares, force view to pending
        if (pendingWithdrawalShares > 0 && view !== "success") {
            setView("pending");
        }
        // If pending shares cleared (cancelled/claimed) and we were in pending view
        else if (pendingWithdrawalShares === 0 && view === "pending") {
            // Only switch back to input if we are NOT currently submitting (processing logic handles explicit transitions)
            if (!isSubmitting) setView("input");
        }
    }, [pendingWithdrawalShares, view, isSubmitting]);

    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setTimeout(() => setAmount(urlAmount), 0);
        }
    }, [searchParams]);

    // Handle contract confirmation closing the overlay
    useEffect(() => {
        if (vault.isConfirmed && isSubmitting) {
            toast.dismiss();
            setIsSubmitting(false);
            setView("success");
            toast.success("Transaction Confirmed!");
            vault.refetchBalance();
        }
    }, [vault.isConfirmed, isSubmitting]);

    const totalBalance = isPreviewMode ? vaultBalanceETH : vault.userBalanceETH;
    const { numAmount, isValidAmount } = getAmountValidation(amount, totalBalance);

    const handleMax = () => {
        return parseFloat(totalBalance.toFixed(6)).toString();
    };

    const handleScheduleWithdraw = async () => {
        if (!isValidAmount || !isConnected || !address) {
            toast.error("Please connect your wallet");
            return;
        }
        setIsSubmitting(true);
        const success = await vault.scheduleWithdraw(numAmount, vault.userShares);
        // Overlay creates waiting state. If failed/rejected, turn off overlay.
        if (!success) {
            setIsSubmitting(false);
        }
    };

    const handleClaim = async () => {
        setIsSubmitting(true);

        if (isPreviewMode) {
            // Simulated Claim
            setTimeout(() => {
                demoClaim();
                // Store update triggers view change via useEffect, but let's be safe
                // Wait for store update first
                setTimeout(() => {
                    setIsSubmitting(false);
                    setView("success"); // Explicit success
                    toast.success("Funds Claimed (Demo)!");
                }, 100);
            }, 1000);
        } else {
            // Real Claim
            const success = await vault.claimWithdraw();
            if (!success) {
                setIsSubmitting(false);
            }
        }
    };

    const handleCancel = async (e?: React.MouseEvent) => {
        e?.preventDefault();
        setIsSubmitting(true);

        if (isPreviewMode) {
            // Simulated Cancel
            setTimeout(() => {
                demoCancel();
                // Store updates pending -> 0. useEffect catches this and switches to 'input'.
                // We just turn off overlay.
                setTimeout(() => {
                    setIsSubmitting(false);
                    setView("input");
                    toast.success("Request Cancelled (Demo)");
                }, 100);
            }, 1000);
        } else {
            // Real Cancel
            const success = await vault.cancelWithdraw();
            if (!success) {
                setIsSubmitting(false);
            } else {
                setIsSubmitting(false);
                setView("input");
            }
        }
    };

    const handlePreviewWithdraw = () => {
        if (!isValidAmount) return;
        setIsSubmitting(true);
        // Update store
        demoWithdraw(numAmount);
        // Wait briefly then close overlay
        setTimeout(() => {
            setIsSubmitting(false);
            // useEffect will catch pending > 0 and switch view to 'pending' naturally
        }, 1000);
    };

    // Countdown computed values
    const canClaim = !vaultExpiry || (now >= vaultExpiry);
    const timeUntilClaim = vaultExpiry ? Math.max(0, vaultExpiry.getTime() - now.getTime()) : 0;
    const hoursUntil = Math.floor(timeUntilClaim / (1000 * 60 * 60));
    const minsUntil = Math.floor((timeUntilClaim % (1000 * 60 * 60)) / (1000 * 60));
    const secsUntil = Math.floor((timeUntilClaim % (1000 * 60)) / 1000);

    return {
        view, setView, amount, setAmount, isSubmitting,
        isPreviewMode, totalBalance, vaultExpiry, vault,
        numAmount, isValidAmount,
        pendingWithdrawalETH,
        canClaim, timeUntilClaim, hoursUntil, minsUntil, secsUntil,
        handleScheduleWithdraw, handleClaim, handleCancel, handlePreviewWithdraw, handleMax,
    };
}
