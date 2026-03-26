"use client";

import type { Components } from "react-markdown";
import type { Message } from "@/types";

export const initialMessages: Message[] = [
    {
        role: "assistant",
        content: "Systems online. I'm Nova.\n\nMarket volatility is stable. The Vultara Vault is currently estimating **8.2% APY**.\n\nShould I analyze the current **OptionBook** for you, or explain the safety mechanisms of the strategy?",
        time: "Now",
    },
];

export const markdownComponents: Components = {
    strong: ({ children }) => <span className="font-bold text-white">{children}</span>,
    p: ({ children }) => <p className="mb-4 leading-7 text-gray-200">{children}</p>,
    table: ({ children }) => <div className="overflow-x-auto my-4 rounded-lg border border-white/10"><table className="w-full text-sm">{children}</table></div>,
    thead: ({ children }) => <thead className="bg-white/5 text-xs uppercase tracking-wider font-bold text-[var(--text-secondary)]">{children}</thead>,
    th: ({ children }) => <th className="px-3 py-3 text-left border-b border-white/10">{children}</th>,
    td: ({ children }) => <td className="px-3 py-3 border-b border-white/5 text-gray-300">{children}</td>,
    ul: ({ children }) => <ul className="list-disc pl-4 space-y-2 my-3 marker:text-[var(--volt)]">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-4 space-y-2 my-3 marker:text-[var(--volt)]">{children}</ol>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-[var(--volt)] pl-4 my-4 italic text-gray-400 bg-white/[0.02] py-2 rounded-r">{children}</blockquote>,
    code: ({ children }) => <code className="bg-black/30 px-1.5 py-0.5 rounded text-xs font-mono text-amber-500 border border-white/10">{children}</code>,
};
