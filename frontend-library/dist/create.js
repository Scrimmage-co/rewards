"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var inversify_1 = require("inversify");
var GameRule_service_1 = require("./api/GameRule.service");
var Player_service_1 = require("./api/Player.service");
var config_1 = require("./config");
var Components = [Player_service_1.PlayerService, GameRule_service_1.GameRuleService];
var create = function (options) {
    if (!options.apiServerEndpoint) {
        throw new Error('API Server Endpoint is required');
    }
    if (!options.refreshToken) {
        throw new Error('Refresh Token is required');
    }
    options.apiServerEndpoint = options.apiServerEndpoint.endsWith('/')
        ? options.apiServerEndpoint.slice(0, -1)
        : options.apiServerEndpoint;
    var container = new inversify_1.Container();
    container.bind(config_1.CONFIG_INJECT_KEY).toConstantValue(options);
    for (var _i = 0, Components_1 = Components; _i < Components_1.length; _i++) {
        var provider = Components_1[_i];
        container.bind(provider).toSelf().inSingletonScope();
    }
    return {
        _container: container,
        api: {
            gameRules: container.get(GameRule_service_1.GameRuleService),
            player: container.get(Player_service_1.PlayerService),
        },
    };
};
exports.create = create;
//# sourceMappingURL=create.js.map