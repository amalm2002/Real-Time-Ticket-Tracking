import { Request, Response, NextFunction } from "express";
import { AuthUtility } from "../utils/auth.utils";
import { STATUS_CODES } from "../constants/statusCodes";

const authUtil = new AuthUtility();

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader, ': authheaderrrrr')
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Access token missing",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = authUtil.verifyAccessToken(token);

        req.user = decoded;
        next();
    } catch (err) {
        console.log(err)
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            message: "Invalid or expired token",
        });
    }
};
