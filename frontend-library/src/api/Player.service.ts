import { PlayerApi } from '../types/api/Player.api';
import { inject, injectable } from 'inversify';
import { HttpService } from '../utils/Http.service';
import { IResourcesDTO } from '@scrimmage/schemas';

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
}
