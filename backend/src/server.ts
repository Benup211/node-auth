import express,{Express,Request,Response,NextFunction} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {SequelizeClass} from "./config/sequelize";
import authRoute from './routes/authRoute';
import {ErrorResponse} from './types/response';
import cookieParser from "cookie-parser";
export class Server{
    public app:express.Application=express();
    constructor(){
        this.setConfigurations();
        this.setRoutes();
        this.handle404Error();
        this.handleErrors();
    }
    async setConfigurations(){
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(cors({origin: "http://localhost:5173", credentials: true}));
        await this.ConnectToDatabase();
    }
    async ConnectToDatabase(){
        const sequelizeDB=new SequelizeClass();
        await sequelizeDB.syncDatabase();
    }
    setRoutes(){
        this.app.use("/auth",authRoute);
    }
    handle404Error() {
		this.app.use((req: Request, res: Response) => {
			res.status(404).json({
				status: 404,
				errorName: "Not Found",
				errorMessage: "Not Found",
			} as ErrorResponse);
		});
	}

	handleErrors() {
		this.app.use((error, req: Request, res: Response, next: NextFunction) => {
			let errorStatus = (error as any).errorStatus || 500;
			let errorMessage = error.message || "Something went wrong. Please try again later";
			res.status(errorStatus).json({
				status: errorStatus,
				errorName: error.name,
				errorMessage: errorMessage,
			} as ErrorResponse);
		});
	}
    
}