export function formatAddress(address: string): string {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatCurrency(
    amount: number,
    options: { decimals?: number; symbol?: string } = {}
): string {
    const { decimals = 2, symbol = "$" } = options;
    return `${symbol}${amount.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })}`;
}

export function formatPercent(value: number, decimals: number = 1): string {
    return `${value.toFixed(decimals)}%`;
}

export function formatTime(): string {
    return new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

export function splitBalance(balance: number): { whole: string; decimal: string } {
    const whole = Math.floor(balance).toLocaleString();
    const decimal = (balance % 1).toFixed(2).slice(2);
    return { whole, decimal };
}
