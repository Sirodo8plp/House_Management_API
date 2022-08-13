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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2 = __importStar(require("argon2"));
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = __importDefault(require("../constants"));
class UserController {
}
_a = UserController;
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    let { username, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { username: username },
    });
    if (user !== null) {
        yield prisma.$disconnect();
        res.status(500).send("Username already exists.");
        return;
    }
    try {
        const pwd = yield argon2.hash(password);
        const User = yield prisma.user.create({
            data: {
                username,
                password: pwd,
            },
        });
        const token = jwt.sign({ userId: User.id, username: User.username }, constants_1.default, { expiresIn: "7d" });
        res.status(201).json({ id: token, message: "success" });
        yield prisma.$disconnect();
        return;
    }
    catch (error) {
        console.error(error);
        yield prisma.$disconnect();
        res.status(500).send("User creation failed");
        return;
    }
});
UserController.findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    let { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { username: username },
        });
        if (user !== null && (yield argon2.verify(user.password, password))) {
            yield prisma.$disconnect();
            const token = jwt.sign({ userId: user.id, username: user.username }, constants_1.default, { expiresIn: "7d" });
            res.status(201).json({ id: token, message: "success" });
            return;
        }
        yield prisma.$disconnect();
        res.status(500).json({ message: "User was not found." });
        return;
    }
    catch (error) {
        yield prisma.$disconnect();
        res.status(500).json({ message: "An error occured." });
        return;
    }
});
exports.default = UserController;
//# sourceMappingURL=UserController.js.map