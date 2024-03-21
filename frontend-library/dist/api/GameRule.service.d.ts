import { GameRuleApi } from '../types/api/GameRules.api';
import { InitOptions } from '../types/InitOptions';
import { PlayerService } from './Player.service';
export declare class GameRuleService implements GameRuleApi {
    private options;
    private playerService;
    constructor(options: InitOptions, playerService: PlayerService);
    getAll(): Promise<any[]>;
}
