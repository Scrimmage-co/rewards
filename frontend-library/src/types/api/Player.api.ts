import { IResourcesDTO } from '@scrimmage/schemas';

export interface PlayerApi {
  get(): Promise<IResourcesDTO>;
}
