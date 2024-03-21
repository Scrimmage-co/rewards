import { IGameRuleInfoDTO, IResourcesDTO } from '@scrimmage/schemas';

export interface GameRuleApi {
  getAll(): Promise<IGameRuleInfoDTO[]>;
  isUserQualified(user: IResourcesDTO, gameRule: IGameRuleInfoDTO): boolean;
}
