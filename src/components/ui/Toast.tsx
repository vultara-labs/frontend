"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
}

interface ToastContextType {
    toasts: Toast[];
    addToast: (type: ToastType, title: string, description?: string) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: ToastType, title: string, description?: string) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, type, title, description }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

const toastIcons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
};

const toastColors = {
    success: "var(--success)",
    error: "var(--error)",
    warning: "var(--warning)",
    info: "var(--info)",
};

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
    return (
        <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => {
                    const Icon = toastIcons[toast.type];
                    const color = toastColors[toast.type];

                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="pointer-events-auto min-w-[320px] max-w-md p-4 rounded-xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] shadow-2xl flex items-start gap-3"
                            style={{ borderLeftColor: color, borderLeftWidth: "3px" }}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}20` }}>
                                <Icon size={18} style={{ color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white mb-0.5">{toast.title}</p>
                                {toast.description && <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{toast.description}</p>}
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="w-6 h-6 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-white hover:bg-white/5 transition-colors shrink-0" aria-label="Dismiss">
                                <X size={14} />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
