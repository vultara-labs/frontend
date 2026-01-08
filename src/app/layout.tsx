import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: "Vultara | Secure Your Income, Amplify Your Growth",
  description: "The smart USDC vault for Indonesian Web3 freelancers. Earn organic yield with Thetanuts V3, powered by Shieldie AI and seamless IDRX off-ramp.",
  keywords: ["Web3", "DeFi", "USDC", "Yield", "Indonesia", "Freelancer", "Crypto", "Base", "Stablecoin", "Payroll"],
  authors: [{ name: "Vultara Labs" }],
  creator: "Vultara Labs",
  publisher: "Vultara Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Vultara | Secure Your Income, Amplify Your Growth",
    description: "The smart USDC vault for Indonesian Web3 freelancers. Earn organic yield with Thetanuts V3.",
    type: "website",
    locale: "en_US",
    siteName: "Vultara",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vultara | The Salary Engine",
    description: "Secure crypto payroll & earn yield on idle USDC. Built for Indonesian Web3 freelancers.",
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
