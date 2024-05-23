import express from 'express';
import { getMessage, sendMessage } from '../controller/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/:_id', protectRoute, expressAsyncHandler(getMessage))
router.post('/send/:_id', protectRoute, expressAsyncHandler(sendMessage))

export default router;