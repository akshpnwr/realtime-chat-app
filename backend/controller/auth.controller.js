import User from "../model/user.model.js";
import { StatusCodes } from "http-status-codes";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })

        if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });

        const isPasswordCorrect = await user.comparePassword(password)

        if (!isPasswordCorrect) res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

        user.createJWT(res)

        res.status(StatusCodes.OK).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
    } catch (error) {
        console.log(`Error in login controller: ${error}`);
    }
}

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password != confirmPassword) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password did not match' });

        const user = await User.findOne({ username });

        if (user) return res.status(StatusCodes.CONFLICT).json({ message: 'Username is already taken' });

        // Hash password
        const profilePic = `${process.env.AVATAR_ICON_URI}/${gender === 'male' ? 'boy' : 'girl'}?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            profilePic
        })

        if (newUser) {

            await newUser.save()
            newUser.createJWT(res)

            res.status(StatusCodes.CREATED).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.log(`Error in signup controller: ${error}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(StatusCodes.OK).json('User logged out successfully')
    } catch (error) {
        console.log(`Error in logout controller: ${error}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
}