"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="fixed inset-0 z-[100] bg-[var(--obsidian-base)] flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                            className="relative"
                        >
                            <img src="/logo-dark.png" alt="Vultara" className="h-16 w-auto" />
                            <div className="absolute inset-0 bg-[var(--volt)] opacity-20 blur-3xl rounded-full" />
                        </motion.div>

                        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: "easeInOut",
                                }}
                                className="w-full h-full bg-gradient-to-r from-transparent via-[var(--volt)] to-transparent"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest"
                        >
                            Initializing Protocol
                        </motion.p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
