import express from 'express';
import { sendMessage } from '../controller/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/send/:_id', protectRoute, expressAsyncHandler(sendMessage))

export default router;