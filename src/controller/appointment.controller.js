import AppointmentModel from "../models/appointment.model.js";
import AppointmentServiceModel from "../models/appointmentService.model.js";
import { getAppointment } from "../services/appointment.service.js";

export const createAppointmentHandle = async (req, res) => {
    try {
        const { name, appointmentDate, startTime, endTime, status, serviceId, notes } = req?.body;

        if (!name || !appointmentDate || !startTime || !endTime) {
            res.status(400).json({ message: "All fields are required" });
        }
        const existAppointment = await getAppointment({
            appointmentDate: appointmentDate,
            startTime,
            endTime,
            serviceId
        });

        if (existAppointment) {
            throw new Error("Appointment already exist")
        }
        const newAppointment = new AppointmentModel({
            appointmentDate,
            startTime,
            endTime,
            status,
            customerId: req.user._id,
            serviceId,
            notes
        });
        await newAppointment.save();
        res.status(201).json({ message: "Appointment created successfully!" })
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
};


export const createService = async (req, res) => {
    try {
        const { name } = req?.body;

        if (!name) {
            res.status(400).json({ message: "name are required" });
        }
        const service = await AppointmentServiceModel.findOne({ name });

        if (service) {
            throw new Error("Service already exist");
        }

        const newService = new AppointmentServiceModel({
            name
        });
        await newService.save();

        res.status(200).json({ message: "service create successfully!" });

    } catch (error) {
        res.status(500).json({ error: error?.message })
    }

}

export const getAllAppointments = async (req, res) => {
    try {
        const user = req.user;
        const body = req.body;

        const appointments = await AppointmentModel.find({
            ...body,
            customerId: user._id
        })
            .populate('customerId')
            .populate('serviceId')

        res.status(200).json({ appointments });

    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
}

export const updateAppointmentHandler = async (req, res) => {
    try {
        const {  appointmentDate, startTime, endTime, status, serviceId, notes } = req?.body;
        const { appointmentId } = req.params;

        if (!appointmentDate || !startTime || !endTime || !status || !serviceId) {
          return  res.status(400).json({ message: "All fields are required" });
        }

        const appointment = await getAppointment({ _id: appointmentId });

        if (!appointment) {
            throw new Error("Appointment not found");
        }

        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, req?.body, { new: true });

        return res.status(200).json({ message: "Appointment updated successfully!", data: updatedAppointment });

    } catch (error) {
       return res.status(500).json({ error: error?.message })
    }
};