import { StatusCodes } from "http-status-codes"
import User from '../model/user.model.js'

export const getUsersForSidebar = async (req, res) => {
    const loggedInUserId = req.user._id

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

    res.status(StatusCodes.OK).json(filteredUsers);
}