import { IAuthController } from "../interfaces/IAuthController";
import { IAuthService } from "../../services/interfaces/IAuthService";
import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCodes";
import { MESSAGES } from "../../constants/messages";

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) { }

    async signup(req: Request, res: Response) {
        try {
            const data = await this.authService.signup(req.body);
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
            const data = await this.authService.login(req.body);
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
}
