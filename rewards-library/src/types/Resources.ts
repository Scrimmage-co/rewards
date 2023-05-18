import { ActiveItem } from './Item';
import { LevelConfig } from './LevelConfig';
import { QuestsConfig } from './Quests';
import { Daily } from './Daily';

export interface GetUserResourcesResponse {
  activeItem: ActiveItem;
  tokens: number;
  levelConfig: LevelConfig;
  nextLevelConfig?: LevelConfig;
  questsConfig: QuestsConfig;
  daily: Daily;
}
