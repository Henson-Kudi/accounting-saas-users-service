//  Create a user

import mongoose, { FlattenMaps } from "mongoose";
import { UsersDb } from "../../data-access";
import { User } from "../../schema-entities/interRefs";
import publishMessage from "../../services/rabbitMQ/publisher";
import { rabbitMQSubscriptions } from "../../utils/constants/rabbitMQSubscriptions";

export default async function createUser(
    connection: mongoose.Connection,
    data: User | User[]
): Promise<FlattenMaps<User> | FlattenMaps<User>[]> {
    try {
        const created = await UsersDb.create(connection, data);

        await publishMessage(rabbitMQSubscriptions.userCreated, created);

        return created;
    } catch (err) {
        throw err;
    }
}
