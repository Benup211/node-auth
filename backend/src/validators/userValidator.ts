import {body,param} from "express-validator";

export class UserValidator{
    static validateUser(){
        return [
            body("email").isEmail().withMessage("Email is required"),
            body("name")
            .notEmpty().withMessage("Name is required")
            .isString().withMessage("Name is required"),
            body("password")
            .isAlphanumeric()
            .withMessage("Password is required and must be alphanumeric")
            .isLength({min:8,max:32})
            .withMessage("Password is required and must be alphanumeric and between 8 to 32 characters"),
        ];
    }
    static validateLogin(){
        return [
            body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Valid email is required"),
            body("password")
            .notEmpty()
            .withMessage("Password is required"),
        ];
    }
    static validateForgetPassword(){
        return [
            body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Valid email is required"),
        ];
    }
    static validateVerifyEmail(){
        return [
            body("code")
            .notEmpty().withMessage("Verification code is required")
            .isString().withMessage("Verification code is required"),
        ];
    }
    static resetPassword(){
        return [
            body("password")
            .isAlphanumeric()
            .withMessage("Password is required and must be alphanumeric")
            .isLength({min:8,max:32})
            .withMessage("Password is required and must be alphanumeric and between 8 to 32 characters"),
            body("confirmPassword")
            .notEmpty()
            .withMessage("Confirm password is required"),
            body("resetPasswordToken")
            .notEmpty()
            .withMessage("Reset token is required"),
        ];
    }
}