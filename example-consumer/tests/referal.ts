import Scrimmage from '@scrimmage/rewards';

const init = () => {
  Scrimmage.initRewarder({
    privateKey: 'AYlApDiXbu_hZzr_J0LUt-HZSvDOywNVxnJaBXJkpwd6ZMxCRfeXVV918-kQBlTlkHBOq8TY',
    apiServerEndpoint: 'https://02b4-106-51-73-122.ngrok-free.app',
  });
};

export const sendReward = async (data: any, uid: string) => {
  init()
  await Scrimmage.reward.trackRewardable(
    {
      id: <string>data.id,
      type: 'referal',
      userId: <string>uid,
    });
};

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

//Start execution and wait till the termination signal is received from the terminal
(async () => {
  console.log('Sending rewards for referal')
  sendReward({ id: generateRandomId() }, 'naruto')
})();

