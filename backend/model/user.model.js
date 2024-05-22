import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: ''
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.createJWT = function (res) {
    const token = jwt.sign({ _id: this._id, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )

    res.cookie('jwt', token, {
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
    })
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;