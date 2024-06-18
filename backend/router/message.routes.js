import express from 'express';
import { createGroup, getMessage, sendMessage, sendMessageToGroup } from '../controller/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/:_id', protectRoute, expressAsyncHandler(getMessage))
router.post('/send/:_id', protectRoute, expressAsyncHandler(sendMessage))
router.post('/sendToGroup/:_id', protectRoute, expressAsyncHandler(sendMessageToGroup))
router.post('/createGroup', protectRoute, expressAsyncHandler(createGroup))

export default router;