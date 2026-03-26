"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { PROTOCOL, YIELD, RISK } from "@/constants";
import { useWalletConnection, useDashboardData, useVaultContract } from "@/hooks";
import { getAmountValidation } from "@/components/ui";

export function useDeposit() {
    const [step, setStep] = useState<"input" | "confirm" | "processing" | "success">("input");
    const [amount, setAmount] = useState("");
    const [riskAcknowledged, setRiskAcknowledged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isConnected, ethBalance, address, isWrongNetwork, switchNetwork } = useWalletConnection();
    const { isPreviewMode, walletBalanceETH, ethPrice, demoDeposit, vaultExpiry } = useDashboardData();
    const vault = useVaultContract({ address });
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlAmount = searchParams.get("amount");
        if (urlAmount && !isNaN(parseFloat(urlAmount))) {
            setAmount(urlAmount);
        }
    }, [searchParams]);

    useEffect(() => {
        if (vault.isConfirmed && step === "processing") {
            toast.dismiss();
            setStep("success");
            toast.success("Deposit Successful!");
        }
    }, [vault.isConfirmed, step]);

    const realWalletBalance = ethBalance ? parseFloat(formatUnits(ethBalance.value, ethBalance.decimals)) : 0;
    const walletBalance = isPreviewMode ? walletBalanceETH : realWalletBalance;
    const gasReserve = 0.001; // Lowered for Base L2 (cheaper gas)

    const { numAmount, isValidAmount, maxDepositable } = getAmountValidation(amount, walletBalance, gasReserve);
    const monthlyYield = YIELD.calculateMonthly(numAmount * ethPrice);
    const depositValueUSD = numAmount * ethPrice;

    const handleContinue = () => {
        if (!isValidAmount) return;
        setStep("confirm");
    };

    const handlePreviewDeposit = () => {
        if (!riskAcknowledged) {
            toast.error("Please acknowledge the risks first");
            return;
        }
        setStep("processing");
        toast.loading("Simulating deposit...");
        setTimeout(() => {
            demoDeposit(numAmount);
            toast.dismiss();
            setStep("success");
            toast.success("Demo Deposit Successful!");
        }, 2000);
    };

    const handleDeposit = async () => {
        if (!riskAcknowledged) {
            toast.error("Please acknowledge the risks first");
            return;
        }
        if (!isConnected || !address) {
            toast.error("Please connect your wallet");
            return;
        }
        setIsSubmitting(true);
        setStep("processing");
        const success = await vault.deposit(numAmount);
        setIsSubmitting(false);
        if (!success) {
            setStep("confirm");
        }
    };

    const handleMax = () => {
        return parseFloat(maxDepositable.toFixed(6)).toString();
    };

    return {
        step, setStep, amount, setAmount, riskAcknowledged, setRiskAcknowledged, isSubmitting,
        isWrongNetwork, switchNetwork, isPreviewMode, walletBalance, ethPrice, gasReserve,
        numAmount, isValidAmount, maxDepositable, monthlyYield, depositValueUSD,
        vaultExpiry, vault,
        handleContinue, handlePreviewDeposit, handleDeposit, handleMax,
    };
}
