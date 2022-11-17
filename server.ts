import * as dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';

dotenv.config({});

const DB_URL = process.env.DB_URL;
const PORT = 5000 || process.env.PORT;

mongoose
    .connect(String(DB_URL))
    .then(() => console.log('Database connected'))
    .catch(() => console.log('Failed to connect Database'));

app.listen(PORT, () => console.log('Server running at ', PORT));
