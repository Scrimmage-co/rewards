import { injectable, inject } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { IPlayerAchievementDTO, IResourcesDTO } from '@scrimmage/schemas';
import { ScrimLang } from '@scrimmage/scrimlang';
import { PlayerService } from './Player.service';

@injectable()
export class AchievementsService {
  constructor(
    @inject(HttpService)
    private httpService: HttpService,
  ) {}

  async getAll(): Promise<IPlayerAchievementDTO[]> {
    const response = await this.httpService.get('p2e/players/@me/achievements');
    return response.data;
  }
}
