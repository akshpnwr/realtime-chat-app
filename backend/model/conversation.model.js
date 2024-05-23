import mongoose, { Mongoose } from "mongoose";

const conversationSchema = new Mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]

}, { timestamps: true })

const conversation = new Mongoose.model('Conversation', conversationSchema);

export default conversation;