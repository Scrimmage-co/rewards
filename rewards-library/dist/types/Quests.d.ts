export interface Quest {
    id: number;
    key: string;
    name: string;
    progressType: 'quest' | 'task';
    tasks: QuestTasks[];
}
export interface QuestReward {
    type: '$SCRIM' | 'asset' | 'dragon';
    amount: number;
}
export interface QuestTasks {
    title: string;
    description?: string;
    linkToAction?: string;
    completeTrigger: AppTriggerType;
    triggerAmount?: number;
    acceptable?: boolean;
    timeLimit?: number;
    reward?: QuestReward;
    completionText?: string;
}
export type AppTriggerType = 'first-sportbook-link' | 'first-scrim-collect' | 'first-dragon-level-up' | 'first-dragon-points-distribute' | 'dragon-heal' | 'marketplace-open' | 'bet-placed-after';
export interface AppTrigger {
    type: AppTriggerType;
    timestamp?: number;
    payload?: any;
}
