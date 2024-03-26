import { PlayerApi } from './Player.api';
import { GameRuleApi } from './GameRules.api';
import { EventEmitter } from 'events';

export interface Api {
  gameRules: GameRuleApi;
  player: PlayerApi;
  updates: EventEmitter;
}
