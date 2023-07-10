import { Request, Response, NextFunction } from "express"
import * as jwt from 'jsonwebtoken';
import config from "../config";

const jwt_decode = require('jwt-decode');
const JWT_KEY = config.jwtSecretKey;

async function middleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (header && header !== "null") {
        const token = header.split(" ")[1];
        jwt.verify(token, JWT_KEY, (err: any, user: any) => {
            if (err) {
                return res
                    .status(400)
                    .send({ success: false, message: "Token Expired" })
            } else {
                next();
            }
        })
    } else {
        res.status(400).json({ success: false, message: "UnAuthorized" })
    }
}

export default middleware;