"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../constants"));
const checkJwt = (req, res, next) => {
    const token = req.header("auth");
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, constants_1.default);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        console.log(error);
        res.status(401).send();
        return;
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, constants_1.default, {
        expiresIn: "7d",
    });
    res.setHeader("token", newToken);
    res.locals.userId = userId;
    next();
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=verifyJsonWebToken.js.map