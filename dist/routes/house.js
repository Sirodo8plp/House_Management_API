"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HouseController_1 = __importDefault(require("../controllers/HouseController"));
const verifyJsonWebToken_1 = require("../middleware/verifyJsonWebToken");
const router = (0, express_1.Router)();
router.get("/", [verifyJsonWebToken_1.checkJwt], HouseController_1.default.findAll);
router.post("/", [verifyJsonWebToken_1.checkJwt], HouseController_1.default.newHouse);
router.post("/updateIsAvailable", [verifyJsonWebToken_1.checkJwt], HouseController_1.default.updateIsAvailable);
router.post("/updateIsProgress", [verifyJsonWebToken_1.checkJwt], HouseController_1.default.updateIsProgress);
router.post("/updateHasCalled", [verifyJsonWebToken_1.checkJwt], HouseController_1.default.updateHasCalled);
exports.default = router;
//# sourceMappingURL=house.js.map