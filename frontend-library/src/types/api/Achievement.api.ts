import { IPlayerAchievementDTO, IResourcesDTO } from '@scrimmage/schemas';

export interface AchievementApi {
  getAll(): Promise<IPlayerAchievementDTO[]>;
  sortAchievementsByTitle(
    achievements: IPlayerAchievementDTO[],
  ): IPlayerAchievementDTO[];
  getAccessibleAchievements(
    achievements: IPlayerAchievementDTO[],
    userResources: IResourcesDTO,
  ): IPlayerAchievementDTO[];
  getVisibleAchievements(
    accessibleAchievements: IPlayerAchievementDTO[],
    userResources: IResourcesDTO,
  ): IPlayerAchievementDTO[];
  getHiddenAchievements(
    visibleAchievements: IPlayerAchievementDTO[],
    accessibleAchievements: IPlayerAchievementDTO[],
  ): IPlayerAchievementDTO[];
  getClosestAchievements(
    visibleAchievements: IPlayerAchievementDTO[],
    userResources: IResourcesDTO,
    count: number,
  ): IPlayerAchievementDTO[];
}
