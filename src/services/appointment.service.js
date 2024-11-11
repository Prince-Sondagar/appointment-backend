import AppointmentModel from "../models/appointment.model.js";

export const getAppointment = async (whereCondition) => {
    try {
        const appointment = await AppointmentModel.findOne(whereCondition);
        return appointment;
    } catch (error) {
        console.log("Error in getAppointment service:", error)
        throw new Error(error)
    }
}