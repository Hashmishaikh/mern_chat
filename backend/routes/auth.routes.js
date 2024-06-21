import express from 'express';
import { login, logoutUser, signupUser } from '../controller/auth.js';

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',login);
router.post('/logout',logoutUser);

export default router;