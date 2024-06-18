import { StatusCodes } from "http-status-codes";
import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import Group from "../model/group.model.js";

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

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    if (!newMessage) throw new Error('Message not sent');

    res.status(StatusCodes.OK).json(newMessage);
}

export const createGroup = async (req, res) => {
    const { name, participants } = req.body;
    const { _id: senderId } = req.user;

    res.json({ senderId, name, participants });
    const newGroup = await Group.create({
        name,
        participants: [...participants, senderId]
    })

    if (!newGroup) throw new Error('Group not created');

    res.status(StatusCodes.CREATED).json(newGroup);
}

export const sendMessageToGroup = async (req, res) => {
    const { _id: groupId } = req.params;
    const { _id: senderId } = req.user
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