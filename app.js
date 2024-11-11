import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import appointmentRoutes from './src/routes/appointment.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/auth', authRoutes);
app.use('/appointment', appointmentRoutes);



app.listen(process.env.PORT, () => {
    console.log(`App listening on PORT:${process.env.PORT}`)
});