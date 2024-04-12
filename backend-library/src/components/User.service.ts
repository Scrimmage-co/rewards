import { inject, injectable } from 'inversify';
import { APIService } from './API.service';

@injectable()
export class UserService {
  constructor(
    @inject(APIService)
    private readonly API: APIService,
  ) {
  }

  async getUserToken(
    userId: string,
    options?: {
      tags?: string[];
      properties?: Record<string, any>;
    },
  ): Promise<string> {
    return this.API.getUserToken(userId, options);
  }
}
