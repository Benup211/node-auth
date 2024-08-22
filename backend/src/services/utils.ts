import { Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
export class Service{
    static createErrorResponse(errorMessage:string,status:number){
        let err:Error=new Error(errorMessage);
        (err as any).errorStatus=status;
        throw err;
    }
    static generateVerificationCode(){
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    static generateResetToken(){
        return crypto.randomBytes(32).toString("hex");
    }
    static createJWTToken(res:Response,userID:string|number){
        const token=jwt.sign({userID:userID},process.env.JWT_SECRET as string,{expiresIn:"7d"});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        });
        return token;
    }
    static verifyJWTToken(token:string){
        return jwt.verify(token,process.env.JWT_SECRET as string);
    }
}