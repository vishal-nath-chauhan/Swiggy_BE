import DishController from "../controllers/dishes.controller.js";
import { Router } from "express";

const routes = Router();

routes.get("/", DishController.getDish).delete("/", DishController.deleteDish).post("/", DishController.addDish);
routes.get("/all", DishController.getAllDishes);
routes.patch("/update", DishController.updateDish);

export default routes