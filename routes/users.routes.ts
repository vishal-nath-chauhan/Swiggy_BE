import UserController from "../controllers/users.controller.js";
import { Router } from "express";
import { validateMongoID } from "../common/common.middleware.js";

const routes = Router();

routes.get("/", validateMongoID, UserController.getUser).delete("/", UserController.deleteUser).post("/", UserController.addUser);
routes.get("/all", UserController.getAllUsers);
routes.patch("/update", UserController.updateUser);

export default routes