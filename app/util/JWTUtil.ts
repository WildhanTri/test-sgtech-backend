import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from 'crypto'

export const generateAccessToken = (username: string) => {
    dotenv.config();
    process.env.TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
    return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1800" });
}