import {
  GetLevelProgressResponse,
  LevelRequirementProgress,
  PlayerApi,
} from '../types/api/Player.api';
import { inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import {IFilterConfigOperators, IResourcesDTO} from '@scrimmage/schemas';
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
    const level = user.stats?.level || 1;

    const levelRequirementProgresses: LevelRequirementProgress[] = [];

    const levelUpRequirements =
        user?.levelConfig?.levelUpRequirements || [];

    let totalProgress = 0;
    for (const requirement of levelUpRequirements) {
      const result = ScrimLang.processProperty(
          user.stats,
          requirement.filter,
          requirement.path,
      );

      const progress = this.getRequirementProgress(
          result.value[0],
          requirement.filter,
          result.success,
      );

      totalProgress += Math.min(1, progress);

      levelRequirementProgresses.push({
        current: result.value[0] || 0,
        required: requirement.filter.value,
        progress: progress * 100,
        title: requirement.title || requirement.path,
      });
    }
    const overallProgress =
        (totalProgress / levelRequirementProgresses.length) * 100;

    const canLevelUp = user?.nextLevelConfig
        ? overallProgress >= 1
        : false;

    return {
      totalProgress: overallProgress || 0,
      levelRequirementProgresses,
    };
  }

  private getRequirementProgress = (
      currentValue: any,
      filter: IFilterConfigOperators,
      isCompleted: boolean,
  ): number => {
    switch (filter.type) {
      case 'number':
        return getNumericCurrentValue(
            Math.floor(Number(currentValue) * 10) / 10,
            filter,
        );
      case 'boolean':
        return currentValue === filter.value ? 1 : 0;
      default:
        return isCompleted ? 1 : 0;
    }
  };
}

const getNumericCurrentValue = (
    currentValue: number,
    filter: IFilterConfigOperators,
) => {
  const { value, operator } = filter;
  const requiredValue = Number(value);

  switch (operator) {
    case 'gte':
      return Math.min(1, currentValue / requiredValue);
    case 'gt':
      return currentValue > requiredValue
          ? 1
          : Math.min(0.99, currentValue / requiredValue);
    case 'eq':
      return currentValue === requiredValue ? 1 : 0;
    case 'lte':
      return currentValue <= requiredValue ? 1 : 0;
    case 'lt':
      return currentValue < requiredValue ? 1 : 0;
    default:
      return 0;
  }
};