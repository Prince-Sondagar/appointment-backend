import mongoose from 'mongoose';


const appointmentSchma = new mongoose.Schema({
    appointmentDate: {
        type: Date,
        require: true,
    },
    startTime: {
        type: String,
        require: true,
        trim: true
    },
    endTime: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        require: true
    },
    notes: {
        type: String,
        require: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const AppointmentModel = mongoose.model('appointment', appointmentSchma);

export default AppointmentModel;