import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vultara | Secure Your Income, Amplify Your Growth",
  description: "The smart USDC vault for Indonesian Web3 freelancers. Earn organic yield with Thetanuts V3, powered by Shieldie AI and seamless IDRX off-ramp.",
  keywords: ["Web3", "DeFi", "USDC", "Yield", "Indonesia", "Freelancer", "Crypto", "Base"],
  authors: [{ name: "Vultara Labs" }],
  openGraph: {
    title: "Vultara | Secure Your Income, Amplify Your Growth",
    description: "The smart USDC vault for Indonesian Web3 freelancers. Earn organic yield with Thetanuts V3.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
