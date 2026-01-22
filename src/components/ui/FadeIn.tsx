"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: FadeDirection;
    distance?: number;
    className?: string;
}

const directionOffsets: Record<FadeDirection, { x: number; y: number }> = {
    up: { x: 0, y: 20 },
    down: { x: 0, y: -20 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
    none: { x: 0, y: 0 },
};

/**
 * Reusable fade-in animation wrapper
 * Wraps content with consistent entrance animation
 */
export function FadeIn({
    children,
    delay = 0,
    duration = 0.6,
    direction = "up",
    distance = 20,
    className = "",
    ...props
}: FadeInProps) {
    const offset = directionOffsets[direction];
    const scaledOffset = {
        x: (offset.x / 20) * distance,
        y: (offset.y / 20) * distance,
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: scaledOffset.x, y: scaledOffset.y }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
                duration,
                delay,
                ease: [0.19, 1, 0.22, 1], // Custom spring easing
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * Stagger container for animating lists of items
 */
interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className = "" }: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Child item for use inside StaggerContainer
 */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
