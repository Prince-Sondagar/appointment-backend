import mongoose from 'mongoose';


const appointmentSeriveSchma = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const AppointmentServiceModel = mongoose.model('Service', appointmentSeriveSchma);

export default AppointmentServiceModel;