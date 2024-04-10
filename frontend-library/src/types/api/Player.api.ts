import { IResourcesDTO } from '@scrimmage/schemas';

export interface PlayerApi {
  get(): Promise<IResourcesDTO>;
  getLevelProgress(user: IResourcesDTO): GetLevelProgressResponse;
}

export interface GetLevelProgressResponse {
  totalProgress: number;
  levelRequirementProgresses: LevelRequirementProgress[];
  canLevelUp: boolean;
  level: number;
}

export interface LevelRequirementProgress {
  current: number;
  required: any;
  title: string;
  progress: number;
}
