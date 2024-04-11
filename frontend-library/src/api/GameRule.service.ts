import { GameRuleApi } from '../types/api/GameRules.api';
import { inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { IGameRuleInfoDTO, IResourcesDTO } from '@scrimmage/schemas';
import { ScrimLang } from '@scrimmage/scrimlang';

@injectable()
export class GameRuleService implements GameRuleApi {
  constructor(
    @inject(HttpService)
    private httpService: HttpService,
  ) {}

  async getAll(): Promise<IGameRuleInfoDTO[]> {
    const response = await this.httpService.get('p2e/players/@me/game-rules');
    return response.data;
  }

  isUserQualified(user: IResourcesDTO, gameRule: IGameRuleInfoDTO): boolean {
    return ScrimLang.checkIfRequirementsFitsObject(
      gameRule.requirements,
      user.properties,
    );
  }
}
