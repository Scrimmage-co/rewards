import API from './api';
import { ServiceUnavailableException } from './exceptions/ServiceUnavailable.exception';
import Config from './config';

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
};

export default {
  verify,
};
