import { IAuthController } from "../interfaces/IAuthController";
import { IAuthService } from "../../services/interfaces/IAuthService";
import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";


export class AuthController implements IAuthController {
    constructor(private _authService: IAuthService) { }

    async signup(req: Request, res: Response) {
        try {
            const { refreshToken, ...data } = await this._authService.signup(req.body);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(STATUS_CODES.CREATED).json({
                message: MESSAGES.USER_CREATED,
                data
            });
        } catch (err: any) {
            res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
                message: err.message || MESSAGES.SERVER_ERROR
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { refreshToken, ...data } = await this._authService.login(req.body);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(STATUS_CODES.OK).json({
                message: MESSAGES.LOGIN_SUCCESS,
                data
            });
        } catch (err: any) {
            res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
                message: err.message || MESSAGES.SERVER_ERROR
            });
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.TOKEN_REQUIRED });
            }

            const data = await this._authService.refreshToken(refreshToken);

            res.status(STATUS_CODES.OK).json({
                message: MESSAGES.TOKEN_REFRESHED,
                data,
            });
        } catch (err: any) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: err.message || MESSAGES.INVALID_REFRESH_TOKEN,
            });
        }
    }

}
