import { Router } from 'express';
import { validateMongoID } from '../common/common.middleware';
import restaurantController from '../controllers/restaurants.controller';

const restaurantRoutes = Router();

restaurantRoutes.get('/', validateMongoID, restaurantController.getRestaurant).delete('/', validateMongoID, restaurantController.deleteRestaurant).post('/', restaurantController.addRestaurant);
restaurantRoutes.get('/all', restaurantController.getAllRestaurants);
restaurantRoutes.patch('/update', validateMongoID, restaurantController.updateRestaurant);

export default restaurantRoutes;
