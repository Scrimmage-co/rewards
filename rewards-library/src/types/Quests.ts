export interface QuestsConfig {
  activeQuestsPerLevel: number;

  questLevelToLevelRequired: Record<string, number>;
}
