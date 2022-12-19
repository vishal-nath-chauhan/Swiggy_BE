import UserController from '../controllers/users.controller'
import CartController from '../controllers/cart.controller'
import { Router } from "express";
import { validateMongoID } from '../common/common.middleware';

const routes = Router();

// routes.get("/", validateMongoID, CartController.getUser).delete("/", CartController.deleteUser).post("/", CartController.addUser);
routes.post('/create', UserController.verifyJWT,  CartController.createCart)
routes.patch('/update',UserController.verifyJWT,CartController.updateCart)
// routes.get("/all", CartController.getAllUsers);
// routes.patch("/update", CartController.updateUser);
// routes.post("/login",CartController.loginUser)

export default routes