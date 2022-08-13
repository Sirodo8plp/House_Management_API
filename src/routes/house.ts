import { Router } from "express";
import HouseController from "../controllers/HouseController";
import { checkJwt } from "../middleware/verifyJsonWebToken";
const router = Router();
router.get("/", [checkJwt], HouseController.findAll);
router.post("/", [checkJwt], HouseController.newHouse);
router.post(
  "/updateIsAvailable",
  [checkJwt],
  HouseController.updateIsAvailable
);
router.post("/updateIsProgress", [checkJwt], HouseController.updateIsProgress);
router.post("/updateHasCalled", [checkJwt], HouseController.updateHasCalled);
export default router;
