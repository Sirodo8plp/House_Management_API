import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import JWT_SECRET from "../constants";

class UserController {
  static newUser = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    let { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (user !== null) {
      await prisma.$disconnect();
      res.status(500).send("Username already exists.");
      return;
    }

    try {
      const pwd = await argon2.hash(password);
      const User = await prisma.user.create({
        data: {
          username,
          password: pwd,
        },
      });
      const token = jwt.sign(
        { userId: User.id, username: User.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.status(201).json({ id: token, message: "success" });
      await prisma.$disconnect();
      return;
    } catch (error) {
      console.error(error);
      await prisma.$disconnect();
      res.status(500).send("User creation failed");
      return;
    }
  };

  static findUser = async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    let { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      if (user !== null && (await argon2.verify(user.password, password))) {
        await prisma.$disconnect();
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "7d" }
        );
        res.status(201).json({ id: token, message: "success" });
        return;
      }
      await prisma.$disconnect();
      res.status(500).json({ message: "User was not found." });
      return;
    } catch (error) {
      await prisma.$disconnect();
      res.status(500).json({ message: "An error occured." });
      return;
    }
  };
}

export default UserController;
