import { GameRuleApi } from '../types/api/GameRules.api';
import { HttpService } from '../utils/Http.service';
import { IGameRuleInfoDTO, IResourcesDTO } from '@scrimmage/schemas';
export declare class GameRuleService implements GameRuleApi {
    private httpService;
    constructor(httpService: HttpService);
    getAll(): Promise<IGameRuleInfoDTO[]>;
    isUserQualified(user: IResourcesDTO, gameRule: IGameRuleInfoDTO): boolean;
}
