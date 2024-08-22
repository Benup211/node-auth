import { Router } from "express";
import {AuthController} from '../controller/authController';
import {UserValidator} from '../validators/userValidator';
import {GlobalMiddleware} from '../middlewares/globalMiddleware';
export class AuthRoute {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
        this.router.get("/", GlobalMiddleware.CheckAuth,AuthController.getWelcome);
        this.router.get("/logout",AuthController.logout);
    }
    postRoutes(){
        this.router.post("/register", UserValidator.validateUser(),GlobalMiddleware.CheckValidation, AuthController.register);
        this.router.post("/verify-email",UserValidator.validateVerifyEmail(),GlobalMiddleware.CheckValidation,AuthController.verifyEmail);
        this.router.post("/login", UserValidator.validateLogin(),GlobalMiddleware.CheckValidation, AuthController.login);
        this.router.post("/forget-password", UserValidator.validateForgetPassword(),GlobalMiddleware.CheckValidation, AuthController.forgotPassword);
        this.router.post("/reset-password", UserValidator.resetPassword(),GlobalMiddleware.CheckValidation, AuthController.resetPassword);
    }
};

export default new AuthRoute().router;