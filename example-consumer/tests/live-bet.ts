import Scrimmage, { BetLeague, BetOutcome, BetSport, BetType, SingleBet, SingleBetType } from '@scrimmage/rewards';
import { BetExecuted, BetMade } from "@scrimmage/rewards";

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

export const sendBetMade = async (data: any, uid: string) => {
  await Scrimmage.reward.trackRewardable<BetMade>(
    'bets',
    <BetMade>{
      id: <string>data.id,
      userId: <string>uid,
      type: 'betMade',
      betType: <BetType>data.betType,
      // decimal odds
      odds: <number>data.odds,
      description: <string>data.description,
      // convert everything in dollars
      wagerAmount: <number>data.wagerAmount,
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

export const sendBetExecuted = async (data: any, uid: string) => {
  await Scrimmage.reward.trackRewardable<BetExecuted>(
    'bets',
    <BetExecuted>{
      id: <string>data.id,
      userId: <string>uid,
      type: 'betExecuted',
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
  init()
  const id = generateRandomId()
  console.log('Sending rewards for live bets')
  sendBetMade({
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
  }, 'nezuko')

  setTimeout(() => {
    sendBetMade({
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
    }, 'nezuko')
  }, 1000)

  setTimeout(() => {
    sendBetExecuted({
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
    }, 'nezuko')
  }, 2000)
})();

