import API from './api';
import Config from './config';

const verify = async () => {
  const config = Config.getConfigOrThrow();
  if (!config.validateApiServerEndpoint) {
    return;
  }

  const serviceStatus = await API.getOverallServiceStatus();
  if (!serviceStatus) {
    config.logger.error('Rewarder API is not available');
  }
  try {
    await API.getRewarderKeyDetails();
  } catch (e) {
    config.logger.error('Rewarder API key is invalid');
  }
};

export default {
  verify,
};
