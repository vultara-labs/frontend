export type ActionType = 'deposit' | 'withdraw' | 'balance';

export interface ActionData {
    type: ActionType;
    amount?: number;
}

export interface MessageCard {
    title: string;
    score: string;
    items: CardItem[];
}

export interface CardItem {
    label: string;
    value: string;
    percent: number;
    color: string;
}

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    time: string;
    card?: MessageCard;
    action?: ActionData;
}
