import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import { getCurrentUser } from "../controller/user.controller";


const router = express.Router();

router.get('/me', authMiddleware, getCurrentUser);


export default router;