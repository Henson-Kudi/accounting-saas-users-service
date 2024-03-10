import dotenv from "dotenv";
dotenv.config();
// IMPORT ALL OTHER FILES HERE (ESPECIALLY IF THEY NEED ACCESS TO ENV)

import { startServer } from "./src";

// start server
const server = startServer();

export default server;
