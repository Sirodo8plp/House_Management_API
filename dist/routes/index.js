"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const house_1 = __importDefault(require("./house"));
const routes = (0, express_1.Router)();
routes.use("/user", user_1.default);
routes.use("/house", house_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map