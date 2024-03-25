import { PlayerApi } from './Player.api';
import { GameRuleApi } from './GameRules.api';
import { WebsocketUpdatesApi } from './WebsocketUpdates.api';

export interface Api {
  gameRules: GameRuleApi;
  player: PlayerApi;
  websocketUpdates: WebsocketUpdatesApi;
}
