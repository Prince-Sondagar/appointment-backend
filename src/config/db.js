import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connection Successfully!')
    } catch (error) {
        console.log("Failed Database Connection:", error)
    }
}

// module.exports = connectDB;



