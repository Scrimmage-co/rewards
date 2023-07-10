import Scrimmage from '@scrimmage/rewards';
import {
  BetExecuted,
  BetLeague,
  BetOutcome,
  BetSport,
  BetType,
  SingleBet,
  SingleBetType
} from "@scrimmage/schemas";

const init = () => {
  Scrimmage.initRewarder({
    privateKey: 'AYi_tAu_rdBTiRAWpSKeUpst8dVvLJqh9ludWSYeCo-KYugn5s6THeuhEjArO-TgygvpPvaI',
    apiServerEndpoint: 'https://0fdb-106-51-73-122.ngrok-free.app',
  });
};

export const sendReward = async (data: any, uid: string) => {
  init()
  await Scrimmage.reward.trackRewardable<BetExecuted>(
    {
      id: <string>data.id,
      userId: <string>uid,
      type: 'bet',
      betType: <BetType>data.betType,
      // decimal odds
      odds: <number>data.odds,
      description: <string>data.description,
      // convert everything in dollars
      wagerAmount: <number>data.wagerAmount,
      // convert everything in dollars
      netProfit: <number>data.netProfit,
      outcome: <BetOutcome>data.outcome, // Make sure you convert
      betDate: <number>data.betDate, // UNIX
      bets: data.bets.map((bet: SingleBet) => ({
        type: <SingleBetType>bet.type,
        odds: <number>bet.odds, // decimal odds
        teamBetOn: <string>bet?.teamBetOn,
        teamBetAgainst: <string>bet?.teamBetAgainst,
        league: <BetLeague>bet?.league,
        sport: <BetSport>bet?.sport,
      })),
    });
};

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

//Start execution and wait till the termination signal is received from the terminal
(async () => {
  const id = generateRandomId()
  let iterator = 1;
  let errors = 0;

  setInterval(async () => {
    const id = Date.now().toString()
    console.log(`Sending rewards for bet #${iterator++}, bet id: ${id} `)
    try {
      await sendReward({
        id: id,
        betType: 'single',
        odds: 1.3,
        description: 'Bet description',
        wagerAmount: 200,
        netProfit: 260,
        outcome: 'win',
        betDate: Date.now(),
        bets: [
          {
            type: 'under',
            odds: 1.5,
            teamBetOn: 'Team A',
            teamBetAgainst: 'Team B',
            league: 'NCAAF',
            sport: 'Football',
          },
        ],
      }, '875::49')
    } catch (e) {
      console.log(`uups, now we have ${++errors} errors, from ${iterator} requests: ${e}`)
    }
  }, 50)
})();

