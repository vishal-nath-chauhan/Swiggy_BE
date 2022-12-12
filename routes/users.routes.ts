import UserController from '../controllers/users.controller'
import { Router } from "express";
import { validateMongoID } from '../common/common.middleware';

const routes = Router();

routes.get("/", validateMongoID, UserController.getUser).delete("/", UserController.deleteUser).post("/", UserController.addUser);
routes.post('/signup', UserController.signUpUser)
routes.get("/all", UserController.getAllUsers);
routes.patch("/update", UserController.updateUser);
routes.post("/login",UserController.loginUser)

export default routes