"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var config_1 = require("./config");
var user_1 = require("./user");
var reward_1 = require("./reward");
var initRewarder = function (config) {
    config_1.default.setConfig(config);
    //TODO: verify rewarderID and private key by making call on backend
    logger_1.default.log('Rewarder Initiated');
};
var Scrimmage = {
    initRewarder: initRewarder,
    user: user_1.default,
    reward: reward_1.default,
};
exports.default = Scrimmage;
