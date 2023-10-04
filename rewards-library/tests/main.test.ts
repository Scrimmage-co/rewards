import Scrimmage from '../src/index';
import * as dotenv from 'dotenv';
dotenv.config({
  path: '.env.test',
});

beforeEach(async () => {
  await Scrimmage.initRewarder({
    apiServerEndpoint: process.env.API_SERVER_ENDPOINT,
    privateKey: process.env.PRIVATE_KEY,
    namespace: process.env.NAMESPACE,
  });
});

test('initRewarder - check', async () => {
  expect(Scrimmage).toBeDefined();
});

test('user.getAllForRewarder - check', async () => {
  const token = await Scrimmage.user.getUserToken('1', {
    tags: ['test'],
    properties: {
      test: 'test',
    },
  });
  expect(token).toBeDefined();
  expect(token.length).toBeGreaterThan(0);
});

test('reward.trackRewardable - check', async () => {
  const response = await Scrimmage.reward.trackRewardable<any>('1', 'test', {
    value: 1,
  });
});