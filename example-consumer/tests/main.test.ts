import Scrimmage from '@scrimmage/rewards';
import * as dotenv from 'dotenv';
dotenv.config();

beforeEach(async () => {
  await Scrimmage.initRewarder({
    apiServerEndpoint: process.env.API_SERVER_ENDPOINT,
    privateKey: process.env.PRIVATE_KEY,
  });
});

test('initRewarder - check', async () => {
  expect(Scrimmage).toBeDefined();
});