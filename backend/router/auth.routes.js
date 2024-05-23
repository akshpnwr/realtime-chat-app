import express from 'express'
import { login, logout, signup } from '../controller/auth.controller.js';
import 'express-async-handler'
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

// Login route
router.post('/login', expressAsyncHandler(login));

// Signup route
router.post('/signup', expressAsyncHandler(signup));

// Logout route
router.post('/logout', expressAsyncHandler(logout));

export default router;