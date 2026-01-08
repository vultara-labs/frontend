import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service | Vultara",
    description: "Terms of Service for Vultara - The smart USDC vault for Indonesian Web3 freelancers.",
};

export default function TermsOfService() {
    return (
        <main className="relative min-h-screen bg-[#0A0A0A]">
            <Navigation />

            <section className="pt-40 pb-32 px-6">
                <div className="max-w-[720px] mx-auto">
                    {/* Header */}
                    <Link href="/" className="inline-block text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-12 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>

                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                        TERMS OF SERVICE
                    </h1>

                    <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-16">
                        Last updated: January 2026
                    </p>

                    {/* Content */}
                    <div className="space-y-12 text-[var(--text-secondary)] leading-relaxed">
                        <div>
                            <h2 className="text-white font-bold text-xl uppercase tracking-tight mb-4">Overview</h2>
                            <p>
                                These Terms of Service are currently under review by our legal team.
                                The complete terms will be published before our mainnet launch.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-white font-bold text-xl uppercase tracking-tight mb-4">What We Will Cover</h2>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--volt)] mt-1">•</span>
                                    <span>Eligibility requirements and account terms</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--volt)] mt-1">•</span>
                                    <span>Acceptable use of our platform</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--volt)] mt-1">•</span>
                                    <span>Smart contract interaction risks</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--volt)] mt-1">•</span>
                                    <span>Fees, payments, and yield distribution</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[var(--volt)] mt-1">•</span>
                                    <span>Limitation of liability</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                            <p className="text-sm">
                                <span className="text-white font-bold">Risk Disclaimer:</span>{" "}
                                DeFi protocols carry inherent risks including smart contract vulnerabilities,
                                market volatility, and potential loss of funds. Use at your own discretion.
                            </p>
                        </div>

                        <div className="pt-12 border-t border-white/10">
                            <h2 className="text-white font-bold text-xl uppercase tracking-tight mb-4">Contact</h2>
                            <p>
                                For questions regarding these terms, contact us at{" "}
                                <a href="mailto:legal@vultara.io" className="text-[var(--volt)] hover:underline">
                                    legal@vultara.io
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
