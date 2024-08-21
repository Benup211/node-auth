import { Sequelize } from "sequelize";
import configDB from "./config";


const env = process.env.NODE_ENV || 'development';
const configOfDatabase = configDB['development'];
export const sequelizeDB = new Sequelize(
	configOfDatabase.database,
	configOfDatabase.username,
	configOfDatabase.password,
	{
		host: configOfDatabase.host,
		dialect:"postgres",
		timezone: configOfDatabase.timezone
	}
);

export class SequelizeClass {
	async syncDatabase() {
		try {
			// await sequelizeDB.sync({force:true});
			console.log("Connection has been established successfully.");
			await sequelizeDB.sync();
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}
}