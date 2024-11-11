import express from 'express';
import { SignIn, signUp } from '../controller/auth.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/signUp', upload.single('profileImage'), signUp);
router.post('/signIn', SignIn);

export default router;