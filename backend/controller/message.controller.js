import { StatusCodes } from "http-status-codes";
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    const { _id: receiverId } = req.params;
    const { _id: senderId } = req.user
    const { message } = req.body;

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })

    if (newMessage) conversation.messages.push(newMessage._id);

    // run in parallel
    await Promise.all([newMessage.save(), conversation.save()]);

    if (!newMessage) throw new Error('Message not sent');

    res.status(StatusCodes.OK).json(newMessage);
}

export const getMessage = async (req, res) => {

    const { _id: receiverId } = req.params;
    const { _id: senderId } = req.user

    const conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    }).populate('messages')

    if (!conversation) return res.status(StatusCodes.OK).json([]);

    const messages = conversation.messages;
    res.status(StatusCodes.OK).json(messages)
}