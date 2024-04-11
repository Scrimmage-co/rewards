import {
  FilterOperationValueType,
  IFilterConfigOperators,
  IResourcesDTO,
  IStatRequirementDTO,
} from '@scrimmage/schemas';

export interface PlayerApi {
  get(): Promise<IResourcesDTO>;
  getLevelProgress(
    user: IResourcesDTO,
    options: LevelRequirementProgressOptions,
  ): LevelRequirementsProgressResult;
  getRequirementProgress(
    currentValues: FilterOperationValueType[],
    filter: IFilterConfigOperators,
    isCompleted: boolean,
  ): number;
  getNumericCurrentValue(
    currentValue: number,
    filter: IFilterConfigOperators,
  ): number;
  getProgressLabel(
    currentValues: FilterOperationValueType[],
    filter: IFilterConfigOperators,
  ): string;
}

export interface LevelRequirementsProgressResult {
  progress: LevelRequirementProgress[];
  overallProgress: number;
  completed: boolean;
}

export interface LevelRequirementProgress {
  icon: string;
  title: string;
  progress: number;
  progressLabel: string;
}

export interface LevelRequirementProgressOptions {
  onMissingTitle?: (requirement: IStatRequirementDTO) => string;
  onMissingIcon?: (requirement: IStatRequirementDTO) => string;
}
