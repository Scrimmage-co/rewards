import Scrimmage from '@scrimmage/rewards';

const init = () => {
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: 'bets',
        value: 'rewarder_key'
      }
    ],
    apiServerEndpoint: 'https://',
  });
};

// Verify that price of SCRIM is right after sending rewardable on high load
(async () => {
  init()
  console.log('Verify that price of SCRIM is right after sending rewardable on high load');
  try {
    const scrimRate = await Scrimmage.user.getScrimRate();
    console.log('SCRIM price: ', scrimRate.rate);
  } catch (e) {
    console.log(e);
  }
})();

