import Scrimmage, {
  Bet,
  BetLeague,
  BetOutcome,
  BetSport,
  BetType,
  SingleBet,
  SingleBetType,
} from "@scrimmage/rewards";

const init = () => {
  Scrimmage.initRewarder({
    privateKeys: [
      {
        alias: "betting",
        value: "test",
      },
    ],
    apiServerEndpoint: "https://nevada.apps.scrimmage.co",
  });
};

export const sendReward = async (data: any, uid: string) => {
  init();
  await Scrimmage.reward.trackRewardable<Bet>("betting", {
    id: <string>data.id,
    userId: <string>uid,
    type: "bet",
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
  const id = generateRandomId();
  let iterator = 1;
  let errors = 0;

  setInterval(async () => {
    const id = Date.now().toString();
    console.log(`Sending rewards for bet #${iterator++}, bet id: ${id} `);
    try {
      await sendReward(
        {
          id: id,
          betType: "single",
          odds: 1.3,
          description: "Bet description",
          wagerAmount: 200,
          netProfit: 260,
          outcome: "win",
          betDate: Date.now(),
          bets: [
            {
              type: "under",
              odds: 1.5,
              teamBetOn: "Team A",
              teamBetAgainst: "Team B",
              league: "NCAAF",
              sport: "Football",
            },
          ],
        },
        "875::49"
      );
    } catch (e) {
      console.log(
        `uups, now we have ${++errors} errors, from ${iterator} requests: ${e}`
      );
    }
  }, 50);
})();
