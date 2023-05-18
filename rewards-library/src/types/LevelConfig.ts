export interface LevelConfig {
  id: number;
  level: number;
  levelUpCost: number;
  experienceRequired: number;
  tokensPerDollar: number;
  dailyBonus: number;
  perkSlots: number;
  perkAmountReward: number;
  createdAt: string;
  updatedAt: string;
  bronzeQuestsRequired: number;
  silverQuestsRequired: number;
  goldenQuestsRequired: number;
}
