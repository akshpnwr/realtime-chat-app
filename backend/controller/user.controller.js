import { StatusCodes } from "http-status-codes"
import User from '../model/user.model.js'

export const getUsersForSidebar = async (req, res) => {
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

    res.status(StatusCodes.OK).json(filteredUsers);
}

export const getUser = async (req, res) => {
    const { _id: userId } = req.params;

    const user = await User.findById(userId).select('-password');

    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    }

    res.status(StatusCodes.OK).json(user);
}