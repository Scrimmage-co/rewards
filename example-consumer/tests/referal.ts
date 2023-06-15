import Scrimmage, { BetExecuted, BetLeague, BetOutcome, BetSport, BetType, SingleBet, SingleBetType } from '@scrimmage/rewards';

const init = () => {
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: 'bets',
        value: 'AYi_tAu_rdBTiRAWpSKeUpst8dVvLJqh9ludWSYeCo-KYugn5s6THeuhEjArO-TgygvpPvaI'
      }
    ],
    apiServerEndpoint: 'https://0fdb-106-51-73-122.ngrok-free.app',
  });
};

export const sendReward = async (data: any, uid: string) => {
  init()
  await Scrimmage.reward.trackRewardable(
    'bets',
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
  sendReward({ id: generateRandomId() }, 'nezuko')
})();

