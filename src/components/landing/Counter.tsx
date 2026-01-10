"use client";

import { useRef, useEffect } from "react";
import { useInView, animate } from "framer-motion";

interface CounterProps {
    from: number;
    to: number;
}

export function Counter({ from, to }: CounterProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const node = nodeRef.current;
        let intervalId: NodeJS.Timeout | null = null;

        const controls = animate(from, to, {
            duration: 2.5,
            ease: [0.19, 1, 0.22, 1],
            onUpdate(value) {
                if (node) {
                    node.textContent = `$${value.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`;
                }
            },
            onComplete() {
                if (!node) return;
                let currentValue = to;
                intervalId = setInterval(() => {
                    const increment = Math.random() * (0.05 - 0.01) + 0.01;
                    currentValue += increment;
                    node.textContent = `$${currentValue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`;
                }, 4000);
            },
        });

        return () => {
            controls.stop();
            if (intervalId) clearInterval(intervalId);
        };
    }, [from, to, isInView]);

    return <span ref={nodeRef} className="tabular-nums tracking-tight" />;
}
