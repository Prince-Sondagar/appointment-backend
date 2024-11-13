import AppointmentModel from "../models/appointment.model";


export const getAppointment = async (whereCondition: any) => {
    try {
        const appointment = await AppointmentModel.findOne(whereCondition);
        return appointment;
    } catch (error: any) {
        console.log("Error in getAppointment service:", error)
        throw new Error(error)
    }
}