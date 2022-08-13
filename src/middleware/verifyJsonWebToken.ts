import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import JWT_SECRET from "../constants";
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth");
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(token!, JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.log(error);
    res.status(401).send();
    return;
  }
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.setHeader("token", newToken);
  res.locals.userId = userId;
  next();
};
