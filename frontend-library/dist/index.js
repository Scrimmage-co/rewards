"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.init = void 0;
require("reflect-metadata");
var create_1 = require("./create");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return create_1.create; } });
var instance;
var init = function (options) {
    instance = (0, create_1.create)(options);
};
exports.init = init;
//# sourceMappingURL=index.js.map