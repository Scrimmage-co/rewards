import { inject, injectable } from 'inversify';
import { ConfigService } from './Config.service';
import { APIService } from './API.service';

@injectable()
export class StatusService {
  constructor(
    @inject(ConfigService)
    private readonly configService: ConfigService,
    @inject(APIService)
    private readonly API: APIService,
  ) {
  }

  async verify() {
    const config = this.configService.getConfigOrThrow();
    if (!config.validateApiServerEndpoint) {
      return;
    }

    const serviceStatus = await this.API.getOverallServiceStatus();
    if (!serviceStatus) {
      config.logger.error('Rewarder API is not available');
    }
    try {
      await this.API.getRewarderKeyDetails();
    } catch (e) {
      config.logger.error('Rewarder API key is invalid');
    }
  }
}
