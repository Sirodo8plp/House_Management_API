import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router();
router.post("/", UserController.newUser);
router.post("/login", UserController.findUser);
export default router;
