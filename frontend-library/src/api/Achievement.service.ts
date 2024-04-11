import { injectable, inject } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { IPlayerAchievementDTO, IResourcesDTO } from '@scrimmage/schemas';
import { ScrimLang } from '@scrimmage/scrimlang';
import { PlayerService } from './Player.service';

@injectable()
export class AchievementsService {
  constructor(
    @inject(HttpService)
    private httpService: HttpService,
    @inject(PlayerService)
    private playerService: PlayerService,
  ) {}

  async getAll(): Promise<IPlayerAchievementDTO[]> {
    const response = await this.httpService.get('p2e/players/@me/achievements');
    return response.data;
  }

  sortAchievementsByTitle(
    achievements: IPlayerAchievementDTO[],
  ): IPlayerAchievementDTO[] {
    return achievements.slice().sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  /**
   * Achievements that user can see at some point of progress
   */
  getAccessibleAchievements(
    achievements: IPlayerAchievementDTO[],
    userResources: IResourcesDTO,
  ): IPlayerAchievementDTO[] {
    return achievements.filter(achievement =>
      ScrimLang.checkIfRequirementsFitsObject(
        achievement.accessRequirements,
        userResources.properties,
      ),
    );
  }

  /**
   * Achievements that user can see and claim
   */
  getVisibleAchievements(
    accessibleAchievements: IPlayerAchievementDTO[],
    userResources: IResourcesDTO,
  ): IPlayerAchievementDTO[] {
    return accessibleAchievements.filter(achievement => {
      if (achievement.claimed) {
        return true;
      }
      if (
        achievement.parentId &&
        !accessibleAchievements.find(a => a.id === achievement.parentId).claimed
      ) {
        return false;
      }
      return (
        !achievement.hidden ||
        ScrimLang.checkIfRequirementsFitsObject(
          achievement.completionRequirements,
          userResources.properties,
        )
      );
    });
  }

  /**
   * Achievements that user cannot see yet
   */
  getHiddenAchievements(
    accessibleAchievements: IPlayerAchievementDTO[],
    visibleAchievements: IPlayerAchievementDTO[],
  ): IPlayerAchievementDTO[] {
    return accessibleAchievements.filter(
      achievement => !visibleAchievements.some(a => a.id === achievement.id),
    );
  }

  /**
   * Achievements that user can see and are closest to completion
   */
  getClosestAchievements(
    visibleAchievements: IPlayerAchievementDTO[],
    userResources: IResourcesDTO,
    closestCount: number,
  ): IPlayerAchievementDTO[] {
    const achievementWithProgress = visibleAchievements.map(achievement => ({
      id: achievement.id,
      claimed: achievement.claimed,
      progress:
        this.playerService.getLevelProgress(userResources).overallProgress,
    }));
    return achievementWithProgress
      .sort((a, b) => {
        if (a.claimed && !b.claimed) {
          return 1;
        }
        if (!a.claimed && b.claimed) {
          return -1;
        }
        return b.progress - a.progress;
      })
      .slice(0, closestCount)
      .map(achievement =>
        visibleAchievements.find(a => a.id === achievement.id),
      );
  }
}
