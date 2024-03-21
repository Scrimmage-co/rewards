import { GetLevelProgressResponse, PlayerApi } from '../types/api/Player.api';
import { HttpService } from '../utils/Http.service';
import { IResourcesDTO } from '@scrimmage/schemas';
export declare class PlayerService implements PlayerApi {
    private httpService;
    constructor(httpService: HttpService);
    get(): Promise<IResourcesDTO>;
    getLevelProgress(user: IResourcesDTO): GetLevelProgressResponse;
}
