import express,{Express,Request,Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {SequelizeClass} from "./config/sequelize";

export class Server{
    public app:express.Application=express();
    constructor(){
        this.setConfigurations();
    }
    async setConfigurations(){
        this.app.use(bodyParser.json());
        this.app.use(cors());
        await this.ConnectToDatabase();
    }
    async ConnectToDatabase(){
        const sequelizeDB=new SequelizeClass();
        await sequelizeDB.syncDatabase();
    }
}