import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        require: true,
        trim: true,
        set: (date: any) => {
            // Parse the date string to ensure time is ignored
            return new Date(date.split('/').reverse().join('-'));
        }
    },
    profileImage: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const UserModel = mongoose.model('User', UserSchema)
export default UserModel;