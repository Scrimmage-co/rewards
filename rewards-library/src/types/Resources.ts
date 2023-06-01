import { ActiveItem, Daily, IQuestsConfigDTO } from '@scrimmage/schemas';
import { LevelConfig } from './LevelConfig';

export interface GetUserResourcesResponse {
  activeItem: ActiveItem;
  tokens: number;
  levelConfig: LevelConfig;
  nextLevelConfig?: LevelConfig;
  questsConfig: IQuestsConfigDTO;
  daily: Daily;
}
