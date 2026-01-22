"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

export function SuccessAnimation() {
    return (
        <div className="relative flex items-center justify-center mb-6">
            {/* Shockwaves */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-[var(--volt)]"
                    initial={{ opacity: 0.8, scale: 0.5 }}
                    animate={{
                        opacity: 0,
                        scale: 2 + i * 0.5,
                        borderWidth: [2, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Glowing Core Background */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-24 h-24 rounded-full bg-[var(--volt)]/10 border border-[var(--volt)]/20 flex items-center justify-center relative z-10 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2
                    }}
                >
                    <CheckCircle size={48} weight="fill" className="text-[var(--volt)] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]" />
                </motion.div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <Particle key={`p-${i}`} index={i} />
            ))}
        </div>
    );
}

function Particle({ index }: { index: number }) {
    // Generate deterministic values based on index to avoid hydration mismatch and impurity
    const xOffset = ((index % 2 === 0 ? 1 : -1) * (10 + index * 5));
    const delay = index * 0.5;

    return (
        <motion.div
            className="absolute w-1 h-1 bg-[var(--volt)] rounded-sm"
            initial={{
                opacity: 0,
                y: 20,
                x: xOffset
            }}
            animate={{
                opacity: [0, 1, 0],
                y: -60 - (index * 10),
            }}
            transition={{
                duration: 2 + (index % 3) * 0.5,
                delay: delay,
                repeat: Infinity,
                repeatDelay: (index % 2) * 0.5,
                ease: "easeOut"
            }}
        />
    );
}
