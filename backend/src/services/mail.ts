import nodemailer from 'nodemailer';
import {VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from './emailTemplate';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
export const sendVerifyMail = async (to: string, verificationToken:string) => {
  try{
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject:"Verify your email",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
      });
  }catch(error){
    console.log("error in sending mail",error);
  }
};
export const sendWelcomeMail=async(to:string,name:string)=>{
    try{
        await transporter.sendMail({
            from:process.env.SMTP_USER,
            to,
            subject:"Welcome to the app",
            html:WELCOME_EMAIL_TEMPLATE.replace("{name}",name),
        });
    }catch(error){
        console.log("error in sending mail",error);
    }
}
export const sendPasswordResetMail=async(to:string,resetURL:string)=>{
    try{
        await transporter.sendMail({
            from:process.env.SMTP_USER,
            to,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        });
    }catch(error){
        console.log("error in sending mail",error);
    }
}
export const sendPasswordResetSuccessMail=async(to:string)=>{
    try{
        await transporter.sendMail({
            from:process.env.SMTP_USER,
            to,
            subject:"Password reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
    }catch(error){
        console.log("error in sending mail",error);
    }
}