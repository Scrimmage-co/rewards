import Scrimmage, { Bet, BetLeague, BetOutcome, BetSport, BetType, SingleBet, SingleBetType } from 'scrimmage-rewards';

const init = () => {
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: "coinflip",
        value:
          "AYeqBMEEeewDZM1rng_nIwXyKRJT0xjmuSNzFAxK2loAy9FLZoqSMzQJEjDdLbw-Px7fKudU",
      },
    ],
    apiServerEndpoint: "https://coinflip.apps.scrimmage.co",
  });
};

export const sendReward = async (data: any, uid: string) => {
  init()
  await Scrimmage.reward.trackRewardable<Bet>(
    'coinflip',
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
  console.log('Sending rewards for live bets')
  sendReward({
      id: id,
    betType: 'single',
      odds: 1.5,
    description: 'Bet description',
      wagerAmount: 200,
      netProfit: 0,
    outcome: 'live',
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
  }, '1')

  setTimeout(() => {
    sendReward({
        id: id,
      betType: 'single',
        odds: 1.3,
      description: 'Bet description',
        wagerAmount: 200,
        netProfit: 0,
      outcome: 'live',
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
    }, '1')
  }, 1000)

  setTimeout(() => {
    sendReward({
        id: id,
      betType: 'single',
        odds: 1.6,
      description: 'Bet description',
        wagerAmount: 200,
        netProfit: 110,
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
    }, '1')
  }, 2000)
})();
