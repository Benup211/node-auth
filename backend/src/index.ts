const { config } = require("dotenv");
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
import {Server} from "./server";
const PORT=process.env.PORT||3000;
const server=new Server();

server.app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
