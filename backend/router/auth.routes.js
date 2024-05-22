import express from 'express'
import { login, logout, signup } from '../controller/auth.controller.js';
const router = express.Router();

// Login route
router.post('/login', login);

// Signup route
router.post('/signup', signup);

// Logout route
router.post('/logout', logout);

export default router;