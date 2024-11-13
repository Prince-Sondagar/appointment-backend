import express from 'express';
import { SignIn, signUp } from '../controller/auth.controller';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/signUp', upload.single('profileImage'), signUp);
router.post('/signIn', SignIn);

export default router;