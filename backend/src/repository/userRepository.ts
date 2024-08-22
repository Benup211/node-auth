import { Sequelize,db } from "../models";

Sequelize.Model.update;

export class UserRepository{
    static async createUser(data:object){
        return await db.User.create(data);
    }
    static async getUserByEmail(email:string){
        return await db.User.findOne({where:{email}});
    }
    static async getUserByVerificationToken(verificationToken:string){
        return await db.User.findOne({where:{
            verificationToken,
            verificationTokenExpires:{
                [Sequelize.Op.gt]:new Date()
            }
        }});
    }
    static async getUserByResetPasswordToken(resetPasswordToken:string){
        return await db.User.findOne({where:{
            resetPasswordToken,
            resetPasswordExpires:{
                [Sequelize.Op.gt]:new Date()
            }
        }}).select("-password");
    }
    static async getUserById(id:string){
        return await db.User.findByPk(id);
    }
}