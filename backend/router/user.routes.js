import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUser, getUsersForSidebar } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);
router.get('/:_id', protectRoute, getUser);


export default router;