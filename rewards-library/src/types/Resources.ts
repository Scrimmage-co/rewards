import { ActiveItem, Daily } from '@scrimmage/schemas';
import { LevelConfig } from './LevelConfig';
import { QuestsConfig } from './Quests';

export interface GetUserResourcesResponse {
  activeItem: ActiveItem;
  tokens: number;
  levelConfig: LevelConfig;
  nextLevelConfig?: LevelConfig;
  questsConfig: QuestsConfig;
  daily: Daily;
}
