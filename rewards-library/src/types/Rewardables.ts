export type BetOutcome =
  | 'win'
  | 'lose'
  | 'push'
  | 'cashout'
  | 'postponed'
  | 'live';
export type BetType = 'single' | 'parlays';
export type SingleBetType = 'over' | 'under' | 'spread' | 'moneyline' | 'prop';
export type BetLeague = string;
export type BetSport = string;

export interface Rewardable {
  /**
   * @description use unique id for rewardable. Do not use the same id twice
   */
  id: string;

  /**
   * @description type of rewarder
   */
  type: string;

  /**
   * @description Internal user id used during integration
   */
  userId: string;
}

export interface Bet extends Rewardable {
  type: 'bet';

  betType: BetType;

  /**
   * @description decimal odds
   */
  odds: number;

  description: string;

  /**
   * @description convert everything in dollars. In cents
   */
  wagerAmount: number;

  /**
   * @description convert everything in dollars. In cents
   */
  netProfit: number;

  /**
   * @description Make sure you convert
   */
  outcome: BetOutcome;

  /**
   * @description UNIX
   */
  betDate: number;

  bets: SingleBet[];
}

export interface SingleBet {
  type: SingleBetType;

  /**
   * @description decimal odds
   */
  odds: number;

  teamBetOn: string;

  teamBetAgainst: string;

  league: BetLeague;

  sport: BetSport;
}
