"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

interface AnimatedNumberProps {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function AnimatedNumber({ value, decimals = 2, prefix = "", suffix = "", className = "" }: AnimatedNumberProps) {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        mass: 1
    });

    // We use a state for the formatted display to handle decimals properly during SSR/hydration
    const [displayValue, setDisplayValue] = useState("0");
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(latest.toFixed(decimals));
        });
        return unsubscribe;
    }, [springValue, decimals]);

    // Initial render / SSR: show the static value directly if desired, 
    // or start from 0 if you want entry animation. 
    // For specialized finance feel, starting from 0 is better.
    if (!hasMounted) {
        return <span className={`tabular-nums ${className}`}>{prefix}0{suffix}</span>;
    }

    return (
        <span className={`tabular-nums ${className}`}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}
