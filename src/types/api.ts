import type { ActionData } from './chat';

export interface ChatRequest {
    message: string;
    history: HistoryMessage[];
    userData?: {
        balance: number;
        earnings: number;
        apy: number;
    };
}

export interface HistoryMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface ChatResponse {
    response: string;
    action?: ActionData;
}
