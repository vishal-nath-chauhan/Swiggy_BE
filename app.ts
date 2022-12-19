import express from 'express';
import * as dotenv from 'dotenv';
import restaurantRoutes from "./routes/restaurants.routes"
import userRoutes from './routes/users.routes'
import dishesRoutes from "./routes/dishes.routes"
import cartRoutes from './routes/cart.routes'
import AppError from "./AppError";
import ErrorHandler from './ErrorController';
import cors from 'cors';

dotenv.config({ path: '.development.env' });

const corsConfig = {
    origin: ["http://localhost:3000/","http://localhost:3000"],

}


const app = express();
app.use(cors(corsConfig))


app.use(express.json())


app.use("/api/v1/restaurants/", restaurantRoutes)
app.use("/api/v1/users/", userRoutes)
app.use("/api/v1/dishes/", dishesRoutes)
app.use("/api/v1/carts/", cartRoutes)





app.use('*', (req, res, next) => {
    const message = `Path not found: ${req.originalUrl}`;
    next(new AppError(message, 404));
});

app.use(ErrorHandler)

export default app;
