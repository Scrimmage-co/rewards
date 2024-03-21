import { PlayerApi } from './Player.api';
import { GameRuleApi } from './GameRules.api';

export interface Api {
  gameRules: GameRuleApi;
  player: PlayerApi;
}
