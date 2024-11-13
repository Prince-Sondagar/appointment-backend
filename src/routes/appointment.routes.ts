import express from 'express';
import { createAppointmentHandle, createService, getAllAppointments, updateAppointmentHandler } from '../controller/appointment.controller';
import authMiddleware from '../middleware/auth.middleware';



const router = express.Router();

router.post('/create', authMiddleware, createAppointmentHandle);
router.post('/createService', createService);
router.post('/getAll', authMiddleware, getAllAppointments)
router.put('/update/:appointmentId', authMiddleware, updateAppointmentHandler)

export default router;