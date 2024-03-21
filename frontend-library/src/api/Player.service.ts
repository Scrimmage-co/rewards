import {
  GetLevelProgressResponse,
  LevelRequirementProgress,
  PlayerApi,
} from '../types/api/Player.api';
import { inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { IResourcesDTO } from '@scrimmage/schemas';
import { ScrimLang } from '@scrimmage/utils';

@injectable()
export class PlayerService implements PlayerApi {
  constructor(
    @inject(HttpService)
    private httpService: HttpService,
  ) {}
  async get(): Promise<IResourcesDTO> {
    const response = await this.httpService.get('p2e/players/@me/resources');
    return response?.data;
  }

  getLevelProgress(user: IResourcesDTO): GetLevelProgressResponse {
    const level = user?.stats?.level || 1;
    let canLevelUp = false;

    const levelRequirementProgresses: LevelRequirementProgress[] = [];

    const levelUpRequirements = user?.levelConfig?.levelUpRequirements || [];
    for (const requirement of levelUpRequirements) {
      const result = ScrimLang.processProperty(
        user.stats,
        requirement.filter,
        requirement.path,
      );

      levelRequirementProgresses.push({
        current: result.value[0] || 0,
        required: requirement.filter.value,
      });
    }

    const totalProgress = levelRequirementProgresses.reduce((acc, curr) => {
      if (curr.current / curr.required > 1) {
        return acc + 1;
      }
      if (!curr.required) {
        return acc + 1;
      }
      return acc + curr.current / curr.required;
    }, 0);
    const overallProgress = totalProgress / levelRequirementProgresses.length;

    if (user?.nextLevelConfig) {
      canLevelUp = overallProgress >= 1;
    }

    return {
      totalProgress: overallProgress || 0,
      levelRequirementProgresses,
    };
  }
}
