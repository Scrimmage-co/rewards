import {
  LevelRequirementProgress,
  LevelRequirementProgressOptions,
  LevelRequirementsProgressResult,
  PlayerApi,
} from '../types/api/Player.api';
import { inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import {
  FilterOperationValueType,
  IFilterConfigOperators,
  IResourcesDTO,
} from '@scrimmage/schemas';
import { ScrimLang } from '@scrimmage/scrimlang';

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

  getLevelProgress(
    user: IResourcesDTO,
    options: LevelRequirementProgressOptions = {},
  ): LevelRequirementsProgressResult {
    const progress: LevelRequirementProgress[] = [];

    const levelUpRequirements = user?.levelConfig?.levelUpRequirements || [];

    let totalProgress = 0;
    for (const requirement of levelUpRequirements) {
      const result = ScrimLang.processProperty(
        user.properties,
        requirement.filter,
        ScrimLang.makeInlineKey(requirement.path),
      );

      const requirementProgress = this.getRequirementProgress(
        result.value,
        requirement.filter,
        result.success,
      );

      totalProgress += Math.min(1, requirementProgress);

      progress.push({
        progress: requirementProgress * 100,
        icon: requirement.icon || options.onMissingIcon?.(requirement),
        title: requirement.title || options.onMissingTitle?.(requirement),
        progressLabel: getProgressLabel(result.value, requirement.filter),
      });
    }
    const overallProgress = (totalProgress / progress.length) * 100;

    return {
      progress,
      overallProgress,
      completed: overallProgress >= 100,
    };
  }

  private getRequirementProgress = (
    currentValues: FilterOperationValueType[],
    filter: IFilterConfigOperators,
    isCompleted: boolean,
  ): number => {
    switch (filter.type) {
      case 'number':
        return getNumericCurrentValue(
          Math.floor(Number(currentValues[0]) * 10) / 10,
          filter,
        );
      case 'boolean':
        return currentValues[0] === filter.value ? 1 : 0;
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
      if (requiredValue === 0) {
        return currentValue >= 0 ? 1 : 0;
      }
      return Math.min(1, currentValue / requiredValue);
    case 'gt':
      if (requiredValue === 0) {
        return currentValue > 0 ? 1 : 0;
      }
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

const getProgressLabel = (
  currentValues: FilterOperationValueType[],
  filter: IFilterConfigOperators,
): string => {
  const { value: requiredValue, type, operator } = filter;
  const currentValue = currentValues.length ? currentValues[0] : '-';

  switch (type) {
    case 'number':
      if (operator === 'gte') {
        return `${currentValue}/${requiredValue}`;
      } else {
        return `${currentValue}`;
      }
  }
};
