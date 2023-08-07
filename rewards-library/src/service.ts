import API from './api';
import { ServiceUnavailableException } from './exceptions/ServiceUnavailable.exception';
import Config from './config';
import { AxiosError } from 'axios';
import { InvalidRewarderKeyException } from './exceptions/InvalidRewarderKey.exception';

const verify = async () => {
  if (!Config.getConfigOrThrow().validateApiServerEndpoint) {
    return;
  }

  const serviceStatus = await API.getOverallServiceStatus();
  if (!serviceStatus) {
    throw new ServiceUnavailableException(
      Config.getConfigOrThrow().apiServerEndpoint,
    );
  }

  try {
    await API.getIntegrationDetails();
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 404) {
      throw new InvalidRewarderKeyException();
    } else {
      throw new ServiceUnavailableException(
        Config.getConfigOrThrow().apiServerEndpoint,
      );
    }
  }
};

export default {
  verify,
};
