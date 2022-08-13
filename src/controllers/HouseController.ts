import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
class HouseController {
  static findAll = async (_: Request, res: Response) => {
    const prisma = new PrismaClient();
    const id = parseInt(res.locals.userId);
    try {
      const houses = await prisma.house.findMany({
        where: {
          userId: id,
        },
      });
      await prisma.$disconnect();
      res.status(201).json({ houses: houses, message: "success" });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  };

  static newHouse = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    let {
      name,
      telephone,
      address,
      isAvailable,
      inProgress,
      ownerName,
      hasCalled,
      personalFavouriteNumber,
      price,
      sharedRooms,
      userId,
    } = req.body;

    const User = await prisma.user.findUnique({
      where: { id: parseInt(res.locals.userId) },
    });

    try {
      const newHouse = await prisma.user.update({
        where: {
          id: User!.id,
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
      await prisma.$disconnect();
      res.status(201).json({ message: "House was added." });
      return;
    } catch (error) {
      await prisma.$disconnect();
      console.error(error);
      res.status(500).send("User creation failed");
      return;
    }
  };

  static updateIsAvailable = async (req: Request, res: Response) => {
    const { id, newAvailability } = req.body;
    const prisma = new PrismaClient();
    try {
      const updateHouse = await prisma.house.update({
        where: {
          id,
        },
        data: {
          isAvailable: newAvailability,
        },
      });
      await prisma.$disconnect();
      res.status(201).send("House was updated");
      return;
    } catch (error: any) {
      await prisma.$disconnect();
      console.log(error);
      res.status(500).send("An error occured.");
      return;
    }
  };

  static updateIsProgress = async (req: Request, res: Response) => {
    const { id, newProgress } = req.body;
    const prisma = new PrismaClient();
    try {
      const updateHouse = await prisma.house.update({
        where: {
          id,
        },
        data: {
          inProgress: newProgress,
        },
      });
      await prisma.$disconnect();
      res.status(201).json({ message: "House was updated" });
      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: "An error occured." });
      return;
    }
  };

  static updateHasCalled = async (req: Request, res: Response) => {
    const { id, newCall } = req.body;
    const prisma = new PrismaClient();
    try {
      const updateHouse = await prisma.house.update({
        where: {
          id,
        },
        data: {
          hasCalled: newCall,
        },
      });
      await prisma.$disconnect();
      res.status(201).json({ message: "House was updated" });
      return;
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: "An error occured." });
      return;
    }
  };
}

export default HouseController;
