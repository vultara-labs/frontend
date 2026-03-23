"use client";

import { useQuery } from "@tanstack/react-query";

interface MarketData {
    price: number;
    change24h: number; // percentage
    lastUpdated: Date;
}

const DEFAULT_MARKET_DATA: MarketData = {
    price: 3200,
    change24h: 1.25,
    lastUpdated: new Date(),
};

async function fetchETHPrice(): Promise<MarketData> {
    try {
        // 1. Try Local API (aggregates Thetanuts, CoinGecko, Coinbase)
        const res = await fetch("/api/price");
        if (!res.ok) throw new Error("Local API failed");
        const json = await res.json();
        return {
            price: json.price,
            change24h: json.change24h ?? 0,
            lastUpdated: new Date()
        };
    } catch (err) {
        console.warn("Local API failed, trying Coinbase direct...");
        try {
            // 2. Try Coinbase direct fallback
            const res = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot");
            if (!res.ok) throw new Error("Coinbase failed");
            const json = await res.json();
            return {
                price: parseFloat(json.data.amount),
                change24h: 0,
                lastUpdated: new Date()
            };
        } catch (fallbackErr) {
            console.warn("All price APIs failed");
            throw new Error("Unable to fetch ETH price");
        }
    }
}

export function useMarketData(asset: string = "ETH") {
    const { data, isLoading, error } = useQuery({
        queryKey: ['marketData', asset],
        queryFn: fetchETHPrice,
        refetchInterval: 30000, // 30 seconds
        staleTime: 10000,       // Consider data fresh for 10 seconds
        retry: 1,
    });

    return {
        data: data || null,
        loading: isLoading,
        error: error ? error.message : null
    };
}

