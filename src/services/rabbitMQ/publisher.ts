import { getConnection } from "../../config/amqp";

const exchangeName: string = "users-service-exchange";
const routingKey: string = "user-created";

export default async function publishMessage(message: string, task: any) {
    try {
        const connection = await getConnection();

        const exchangeType = "fanout"; //might need to be dynamic

        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, exchangeType, {
            durable: true,
        });

        channel.sendToQueue(exchangeName, Buffer.from(message));

        console.log("Published user created event:", message);
    } catch (err) {}
}
