"use client";

import { YieldCalculator } from "@/components/ui";
import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function CalculatorPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <header className="mb-8">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-white transition-colors mb-4">
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                    Yield Calculator
                </h1>
                <p className="text-[var(--text-secondary)]">
                    Estimate potential returns based on different market conditions.
                </p>
            </header>

            <YieldCalculator />

            {/* Additional Info */}
            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <h3 className="text-white font-bold mb-3">How Yield is Calculated</h3>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <li>• <strong>Low Volatility:</strong> ~3-5% APY typical in stable markets</li>
                    <li>• <strong>Normal:</strong> ~4-8% APY during average conditions</li>
                    <li>• <strong>High Volatility:</strong> ~6-15% APY when markets are volatile</li>
                </ul>
                <p className="text-xs text-[var(--text-tertiary)] mt-4">
                    Strategy: Cash-Secured Puts via Thetanuts V4 OptionBook
                </p>
            </div>
        </div>
    );
}
