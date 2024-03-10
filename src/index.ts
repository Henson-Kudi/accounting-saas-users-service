import express from "express";
import responseHandler from "./utils/responseHandler";
import router from "./routes";
import { connectToRedis } from "./config/redis";
import initialiseRabbitMQSubscriptions from "./services/rabbitMQ/subscriber";

const app = express();

const PORT = process.env.PORT || 5002;

// use express.json
app.use(express.json());

// INTITIALISE RESPONSEHANDLER
app.use(responseHandler);

// (async () => {
//     try {
//         const processTestMessage = async (message: any) => {
//             console.log(message);
//         };

//         await connectToRedis();
//         // subscribe to queues
//         await initialiseRabbitMQSubscriptions();
//     } catch (err) {
//         console.log(err);
//     }
// })();

// Define routes here
app.use("/api/users", router);

export const startServer = () =>
    app.listen(PORT, () => {
        console.log(`Users service running on port ${PORT}`);
    });

export default app;
