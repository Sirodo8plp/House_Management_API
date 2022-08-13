"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class HouseController {
}
_a = HouseController;
HouseController.findAll = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const id = parseInt(res.locals.userId);
    try {
        const houses = yield prisma.house.findMany({
            where: {
                userId: id,
            },
        });
        yield prisma.$disconnect();
        res.status(201).json({ houses: houses, message: "success" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "error" });
    }
});
HouseController.newHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    let { name, telephone, address, isAvailable, inProgress, ownerName, hasCalled, personalFavouriteNumber, price, sharedRooms, userId, } = req.body;
    const User = yield prisma.user.findUnique({
        where: { id: parseInt(res.locals.userId) },
    });
    try {
        const newHouse = yield prisma.user.update({
            where: {
                id: User.id,
            },
            data: {
                houses: {
                    create: {
                        name,
                        telephone,
                        address,
                        isAvailable,
                        inProgress,
                        ownerName,
                        hasCalled,
                        personalFavouriteNumber: parseInt(personalFavouriteNumber),
                        price,
                        sharedRooms,
                    },
                },
            },
        });
        yield prisma.$disconnect();
        res.status(201).json({ message: "House was added." });
        return;
    }
    catch (error) {
        yield prisma.$disconnect();
        console.error(error);
        res.status(500).send("User creation failed");
        return;
    }
});
HouseController.updateIsAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newAvailability } = req.body;
    const prisma = new client_1.PrismaClient();
    try {
        const updateHouse = yield prisma.house.update({
            where: {
                id,
            },
            data: {
                isAvailable: newAvailability,
            },
        });
        yield prisma.$disconnect();
        res.status(201).send("House was updated");
        return;
    }
    catch (error) {
        yield prisma.$disconnect();
        console.log(error);
        res.status(500).send("An error occured.");
        return;
    }
});
HouseController.updateIsProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newProgress } = req.body;
    const prisma = new client_1.PrismaClient();
    try {
        const updateHouse = yield prisma.house.update({
            where: {
                id,
            },
            data: {
                inProgress: newProgress,
            },
        });
        yield prisma.$disconnect();
        res.status(201).json({ message: "House was updated" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured." });
        return;
    }
});
HouseController.updateHasCalled = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newCall } = req.body;
    const prisma = new client_1.PrismaClient();
    try {
        const updateHouse = yield prisma.house.update({
            where: {
                id,
            },
            data: {
                hasCalled: newCall,
            },
        });
        yield prisma.$disconnect();
        res.status(201).json({ message: "House was updated" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured." });
        return;
    }
});
exports.default = HouseController;
//# sourceMappingURL=HouseController.js.map