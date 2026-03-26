// Thetanuts API for live market data
export const THETANUTS_API = "https://round-snowflake-9c31.devops-118.workers.dev/";
export const ETH_PRICE_FEED = "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70";

export interface ThetanutsOrder {
    order: {
        strikes: number[];
        expiry: number;
        isCall: boolean;
        priceFeed: string;
    };
    greeks?: {
        delta: number;
        iv: number;
        gamma: number;
        theta: number;
        vega: number;
    };
}

export async function fetchLiveMarketData(): Promise<string> {
    try {
        const res = await fetch(THETANUTS_API, { next: { revalidate: 60 } });
        if (!res.ok) return "";

        const data = await res.json();
        const ethOrders = data.data.orders.filter(
            (o: ThetanutsOrder) => o.order.priceFeed === ETH_PRICE_FEED && o.greeks
        );

        if (ethOrders.length === 0) return "";

        const ivValues = ethOrders.map((o: ThetanutsOrder) => o.greeks!.iv * 100);
        const avgIV = ivValues.reduce((a: number, b: number) => a + b, 0) / ivValues.length;

        const callCount = ethOrders.filter((o: ThetanutsOrder) => o.order.isCall).length;
        const putCount = ethOrders.length - callCount;

        const strikes = ethOrders.map((o: ThetanutsOrder) => o.order.strikes[0] / 100000000);
        const avgStrike = strikes.reduce((a: number, b: number) => a + b, 0) / strikes.length;

        // Format timestamp to be readable and relative
        let formattedTime = data.data.timestamp;
        let relativeTime = "";
        try {
            const date = new Date(data.data.timestamp);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            relativeTime = diffMins < 1 ? " (Just now)" : ` (${diffMins} mins ago)`;

            formattedTime = date.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
                timeZoneName: "short"
            }) + relativeTime;
        } catch (e) {
            // Keep original if parsing fails
        }

        return `
LIVE MARKET DATA (from Thetanuts V4 API):
- Active ETH Options: ${ethOrders.length} orders
- Put-Call Ratio: ${(putCount / (callCount || 1)).toFixed(2)} (${putCount} Puts / ${callCount} Calls)
- Average IV: ${avgIV.toFixed(1)}% (${avgIV > 50 ? "HIGH - Great for Yield Generation" : avgIV > 30 ? "MODERATE" : "LOW"})
- Average Strike Price: $${avgStrike.toLocaleString(undefined, { maximumFractionDigits: 0 })}
- Data Timestamp: ${formattedTime}
`;
    } catch (e) {
        console.warn("Failed to fetch Thetanuts data for Nova:", e);
        return "";
    }
}
