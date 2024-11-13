import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import { getUser } from "../services/user.service";
import UserModel from '../models/user.models';

export const signUp = async (req: any, res: any) => {
    try {

        const body = JSON.parse(req?.body?.user);

        let { firstName, lastName, email, dateOfBirth, password, gender, termsAndCondition } = body;

        if (!firstName || !lastName || !email || !dateOfBirth || !password || !gender || !termsAndCondition) {
            throw new Error("All fields are required!")
        }

        const user = await getUser({ email });

        if (user) {
            throw new Error("User already exist");
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        const profileImage = req.file ? req.file.path : null;

        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            termsAndCondition,
            profileImage,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ status: 201, message: "User Created successfully!" });
    } catch (error: any) {
        if (req?.file) {
            fs.unlinkSync(req?.file?.path);
        }
        console.log("Error in signUp controller", error);
        res.status(500).send({ status: 500, message: error?.message })
    }
}


export const SignIn = async (req: any, res: any) => {
    try {
        const { email, password } = req?.body;

        if (!email || !password) {
            throw new Error("All fields are required!");
        }

        const user = await getUser({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const passwordMatch = await bcrypt.compare(password, user?.password as string);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user?._id, email: user?.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return res.status(200).json({ message: "SignIn Successfully!", token: token })
    } catch (error: any) {
        res.status(500).send({ status: 200, message: error?.nessage })
    }
}

