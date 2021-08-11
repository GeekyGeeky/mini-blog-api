import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '../config'

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true, required: true, trim: true, lowercase: true, match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"], },
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "Username is required"]
    },
    password: {
        type: String, required: true, select: false,
    },
    about: String,
    skills: String,
    portfolio: String,
    dateJoined: { type: Date, default: Date.now }
}, { runSettersOnQuery: true });

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// sign JWT
UserSchema.methods.getJwtToken = function () {
    return sign({
        result: {
            id: this._id,
            name: this.name,
            email: this.email,
            username: this.username
        }
    }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    });
}

// compare password
UserSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

// compare password
UserSchema.methods.hashPassword = async function (userPassword) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(userPassword, salt);
}

export default model('User', UserSchema);