import bcrypt from 'bcrypt';
import { findUser } from "../services/user.service.js";
import UserModel from '../models/user.models.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {

        const body = JSON.parse(req?.body?.user);


        console.log("body ===>", body);
        let { firstName, lastName, email, dateOfBirth, password } = body;

        console.log("firstName ===>", firstName);

        if (!firstName || !lastName || !email || !dateOfBirth || !password) {
            throw new Error("All fields are required!")
        }

        const user = await findUser({ email });

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
            profileImage,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ status: 201, message: "User Created successfully!" });
    } catch (error) {
        console.log("req.file===>", req?.file)
        if (req?.file) {
            fs.unlinkSync(req?.file?.path);
        }
        console.log("Error in signUp controller", error);
        res.status(500).send({ status: 500, error: error?.message })
    }
}


export const SignIn = async (req, res) => {
    try {
        const { email, password } = req?.body;

        if (!email || !password) {
            throw new Error("All fields are required!");
        }

        const user = await findUser({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const passwordMatch = await bcrypt.compare(password, user?.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user?._id, email: user?.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "SignIn Successfully!", token: token })
    } catch (error) {
        res.status(500).send({ status: 200, message: error?.nessage })
    }
}

