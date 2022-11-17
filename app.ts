import express from 'express';
import * as dotenv from 'dotenv';
import restaurantRoutes from "./routes/restaurants.routes"
import AppError from "./AppError";
import ErrorHandler from './ErrorController';

dotenv.config({ path: '.development.env' });



const app = express();

app.use(express.json())

app.use("/api/v1/restaurants/", restaurantRoutes)

app.use('*', (req, res, next) => {
    const message = `Path not found: ${req.originalUrl}`;
    next(new AppError(message, 404));
});

app.use(ErrorHandler)

export default app;
