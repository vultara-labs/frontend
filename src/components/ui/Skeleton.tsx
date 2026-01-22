"use client";

// Skeleton components for loading states
export function SkeletonCard({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse rounded-2xl bg-white/[0.03] border border-white/[0.05] p-6 ${className}`}>
            <div className="h-3 w-20 bg-white/[0.08] rounded mb-3" />
            <div className="h-8 w-32 bg-white/[0.1] rounded" />
        </div>
    );
}

export function SkeletonText({ width = "w-24", height = "h-4" }: { width?: string; height?: string }) {
    return <div className={`animate-pulse ${width} ${height} bg-white/[0.08] rounded`} />;
}

export function SkeletonBalance() {
    return (
        <div className="animate-pulse">
            <div className="h-4 w-20 bg-white/[0.05] rounded mb-2" />

            {/* Matching hero text size to prevent layout shift */}
            <div className="h-12 sm:h-20 lg:h-24 w-48 sm:w-64 lg:w-96 bg-white/[0.08] rounded mb-3" />

            <div className="h-5 w-32 bg-white/[0.05] rounded" />
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="animate-pulse h-40 w-full bg-white/[0.03] rounded-xl border border-white/[0.05] flex items-end justify-around p-4 gap-2">
            {[40, 60, 45, 80, 55, 70, 50].map((h, i) => (
                <div key={i} className="bg-white/[0.08] rounded-t" style={{ height: `${h}%`, width: '10%' }} />
            ))}
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            {/* Balance Section */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <SkeletonBalance />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

            {/* Chart */}
            <SkeletonChart />
        </div>
    );
}
