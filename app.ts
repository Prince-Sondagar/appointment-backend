import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.routes';
import appointmentRoutes from './src/routes/appointment.routes';
import userRoutes from './src/routes/user.routes'
import cors from 'cors';
import { connectDB } from './src/config/db';

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/auth', authRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/user', userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`App listening on PORT:${process.env.PORT}`)
});