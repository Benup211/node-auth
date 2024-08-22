import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Service } from "../services/utils";
export class GlobalMiddleware {

    static CheckValidation(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(Service.createErrorResponse(errors.array()[0].msg, 400));
        }
        next();
    }
    static async CheckAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token;
            if (!token) {
                next(Service.createErrorResponse("Unauthorized", 401));
            }
            const decodedToken = Service.verifyJWTToken(token);
            if (!decodedToken) {
                next(Service.createErrorResponse("Invalid token", 401));
            }
            req.body.userID = decodedToken.userID;
            next();
        } catch (error) {
            next(error);
        }
    }
}