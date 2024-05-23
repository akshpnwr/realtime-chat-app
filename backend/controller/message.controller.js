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

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })

    if (!newMessage) throw new Error('Message not sent');

    res.status(StatusCodes.OK).json(newMessage);
}