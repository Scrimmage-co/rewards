import { IResourcesDTO } from '@scrimmage/schemas';

export interface PlayerApi {
  get(): Promise<any>;
  getLevelProgress(user: IResourcesDTO): GetLevelProgressResponse;
}

export interface GetLevelProgressResponse {
  totalProgress: number;
  levelRequirementProgresses: LevelRequirementProgress[];
}

export interface LevelRequirementProgress {
  current: number;
  required: any;
}
