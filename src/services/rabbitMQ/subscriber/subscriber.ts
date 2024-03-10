import { ConsumeMessage } from "amqplib";
import RabbitMQInstance, { getConnection } from "../../../config/amqp";
import { acquireLock, releaseLock } from "../../../config/redis";

async function subScribeToChannels(queue: string, taskProcessor: Function) {
    const channel = await RabbitMQInstance.createChannel();

    await channel.assertQueue(queue, { durable: true });

    channel.prefetch(1);

    console.log("[*] Waiting for messages in %s.", queue);

    channel.consume(
        queue,
        async (msg: ConsumeMessage | null) => {
            const content = msg?.content.toString();

            // console.log(content, "--content data");

            let lockId;

            if (content) {
                lockId = await acquireLock(content);
            }

            // console.log(lockId, "--lock id data");

            if (!lockId && msg) {
                // console.log("first");

                return channel.nack(msg); // Reject the message as it is locked
            }

            try {
                // Process the message here...
                console.log("Processing message:", content);

                if (content) {
                    await taskProcessor(JSON.parse(content));

                    // After processing
                    await releaseLock(content, lockId);
                }
                if (msg) {
                    channel.ack(msg); // Acknowledge after processing
                }
            } catch (error) {
                if (content) {
                    await releaseLock(content, lockId);
                }

                if (msg) {
                    channel.nack(msg); // Reject the message on error
                }
            }
        },
        { noAck: false }
    );
}

export default subScribeToChannels;

import amqplib from "amqplib/callback_api";

const rabbitmqUrl: string = "amqp://your-rabbitmq-host:your-port";
const exchangeName: string = "user-events-exchange";
const routingKey: string = "user-created"; // Optional routing key relevant for exchange, not queues

export class Consumer {
    constructor(
        private readonly processUserCreated: (userData: {
            userId: string;
            name: string;
        }) => Promise<void>
    ) {}

    public async start(): Promise<void> {
        const connection = await getConnection();

        const channel = await connection.createChannel();

        await channel.assertExchange(exchangeName, "fanout", {
            durable: true,
        }); // Declare exchange (optional if already exists)

        const queueName = `users-service-queue`; // Unique queue name per service
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, routingKey);

        const consumerGroup = `users-service-group`; // Unique consumer group per service

        channel.consume(
            queueName,
            async (msg: amqplib.ConsumeMessage | null) => {
                if (msg !== null) {
                    try {
                        const userData = JSON.parse(msg.content.toString()); // Assuming JSON message format

                        await this.processUserCreated(userData);

                        channel.ack(msg); // Individual acknowledgement
                    } catch (error) {
                        console.error(
                            "Error processing user created message:",
                            error
                        );
                        // Implement error handling (e.g., retry or dead-lettering)
                    }
                }
            },
            {
                noAck: false,
                consumerTag: `${process.env.INSTANCE_ID}`,
                consumerGroup,
                
            }
        );
    }
}
