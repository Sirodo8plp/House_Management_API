import { Router } from "express";
import user from "./user";
import house from "./house";

const routes = Router();

routes.use("/user", user);
routes.use("/house", house);

export default routes;
