"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRuleService = void 0;
var inversify_1 = require("inversify");
var config_1 = require("../config");
var Player_service_1 = require("./Player.service");
var GameRuleService = /** @class */ (function () {
    function GameRuleService(options, playerService) {
        this.options = options;
        this.playerService = playerService;
        console.log(options, playerService);
    }
    GameRuleService.prototype.getAll = function () {
        return Promise.resolve([]);
    };
    GameRuleService = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(config_1.CONFIG_INJECT_KEY)),
        __param(1, (0, inversify_1.inject)(Player_service_1.PlayerService)),
        __metadata("design:paramtypes", [Object, Player_service_1.PlayerService])
    ], GameRuleService);
    return GameRuleService;
}());
exports.GameRuleService = GameRuleService;
//# sourceMappingURL=GameRule.service.js.map