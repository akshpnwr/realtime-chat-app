import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) throw new Error('Not authorized, no token')

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) throw new Error('Not authorized, token failed')

    const user = await User.findById(decoded._id).select('-password')
    req.user = user
    next()
}

export default protectRoute;