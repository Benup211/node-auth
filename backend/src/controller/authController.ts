import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repository/userRepository";
import { Service } from "../services/utils";
import bcrypt from "bcrypt";
import {
    sendVerifyMail,
    sendWelcomeMail,
    sendPasswordResetMail,
    sendPasswordResetSuccessMail
} from "../services/mail";
export class AuthController {
    static async getWelcome(req: Request, res: Response, next: NextFunction) {
        const {userID}=req.body;
        try {
            const user = await UserRepository.getUserById(userID);
            res.status(200).json({
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive,
                    lastLogin: user.lastLogin
                },
                message: `Welcome ${user.name}`  });
        } catch (error) {
            next(error);
        }
    }
    static async register(req: Request, res: Response, next: NextFunction) {
        const { email, name, password } = req.body;
        try {
            const userExists = await UserRepository.getUserByEmail(email);
            if (userExists) {
                throw Service.createErrorResponse("User already exists", 400);
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const verificationToken = Service.generateVerificationCode();
            const user = await UserRepository.createUser({
                email,
                name,
                password: hashPassword,
                verificationToken: verificationToken,
                verificationTokenExpires: new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                ),
            });
            const token = Service.createJWTToken(res, user.id);
            sendVerifyMail(email, verificationToken);
            res.status(201).json({
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive,
                    lastLogin: user.lastLogin
                },
                message: "User created successfully",
                token: token,
            });
        } catch (error) {
            next(error);
        }
    }
    static async verifyEmail(req: Request, res: Response, next: NextFunction) {
        const { code } = req.body;
        try {
            const user = await UserRepository.getUserByVerificationToken(code);
            if (!user) {
                throw Service.createErrorResponse(
                    "Invalid verification token",
                    400
                );
            }
            user.verificationToken = null;
            user.verificationTokenExpires = null;
            user.isActive = true;
            await user.save();
            sendWelcomeMail(user.email, user.name);
            res.status(200).json({ 
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive,
                    lastLogin: user.lastLogin,
                },
                message: "Email verified successfully" });
        } catch (error) {
            next(error);
        }
    }
    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("token");
            res.status(200).json({ message: "Logout successfully" });
        } catch (error) {
            next(error);
        }
    }
    static async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const user = await UserRepository.getUserByEmail(email);
            if (!user) {
                throw Service.createErrorResponse("Invalid credentials", 400);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw Service.createErrorResponse("Invalid credentials", 400);
            }
            const verifiedUser = user.isActive;
            if (!verifiedUser) {
                throw Service.createErrorResponse("Email not verified", 400);
            }
            const token = Service.createJWTToken(res, user.id);
            user.lastLogin = new Date();
            res.status(200).json({
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive,
                    lastLogin: user.lastLogin
                },
                message: "Login successfully",
                token: token,
            });
        } catch (error) {
            next(error);
        }
    }
    static async forgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { email } = req.body;
        try {
            const user = await UserRepository.getUserByEmail(email);
            if (!user) {
                throw Service.createErrorResponse("User not found", 400);
            }
            const resetToken = Service.generateResetToken();
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = new Date(
                Date.now() + 24 * 60 * 60 * 1000
            );
            await user.save();
            const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
            sendPasswordResetMail(user.email, resetURL);
            res.status(200).json({
                message: "Reset password link sent to your email",
            });
        } catch (error) {
            next(error);
        }
    }
    static async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { password, confirmPassword, resetPasswordToken } = req.body;
        try {
            if (password !== confirmPassword) {
                throw Service.createErrorResponse(
                    "Password and confirm password do not match",
                    400
                );
            }
            console.log("Here")
            const user = await UserRepository.getUserByResetPasswordToken(
                resetPasswordToken
            );
            console.log("Here 2")
            if (!user) {
                throw Service.createErrorResponse("Invalid reset token", 400);
            }
            console.log()
            const hashPassword = await bcrypt.hash(password, 12);
            user.password = hashPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save("here 3");
            sendPasswordResetSuccessMail(user.email);
            res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            next(error);
        }
    }
}
