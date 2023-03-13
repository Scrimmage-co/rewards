export enum BetOutcome {
    win, lose, push, cashout, postponed
}
export enum BetType {
    single, parlays
}
export enum SingleBetType {
    over, under, spread, moneyline, prop
}
export enum BetLeague {}
export enum BetSport {}


export interface Rewardable {}
export interface Bet extends Rewardable {}
export interface SingleBet {}