"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var main_1 = require("./main");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return main_1.init; } });
__exportStar(require("./types/Collectible"), exports);
__exportStar(require("./types/Asset"), exports);
__exportStar(require("./types/Item"), exports);
__exportStar(require("./types/Rewarders"), exports);
__exportStar(require("./types/Region"), exports);
