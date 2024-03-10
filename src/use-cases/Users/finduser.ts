// Functionalities for finding (searching a team)

import mongoose, { Types } from "mongoose";
import { UsersDb } from "../../data-access";
import ID from "../../types/ID";
import { User } from "../../schema-entities/interRefs";

export async function findUsers(
    connection: mongoose.Connection,
    filter?: mongoose.FilterQuery<User>,
    projection?: mongoose.ProjectionType<User>,
    options?: mongoose.QueryOptions
): Promise<mongoose.FlattenMaps<User>[] | null | undefined> {
    try {
        const data = await UsersDb.find(
            connection,
            filter ?? {},
            projection,
            options
        );

        return data;
    } catch (err) {
        throw err;
    }
}

export async function findOneUser(
    connection: mongoose.Connection,
    filter?: mongoose.FilterQuery<User>,
    projection?: mongoose.ProjectionType<User>,
    options?: mongoose.QueryOptions
): Promise<mongoose.FlattenMaps<User> | null | undefined> {
    try {
        const data = await UsersDb.findOne(
            connection,
            filter ?? {},
            projection,
            options
        );

        return data;
    } catch (err) {
        throw err;
    }
}

export async function findUserById(
    connection: mongoose.Connection,
    id: ID,
    projection?: mongoose.ProjectionType<User>,
    options?: mongoose.QueryOptions
): Promise<mongoose.FlattenMaps<User> | null | undefined> {
    try {
        const data = await UsersDb.findById(
            connection,
            new Types.ObjectId(id?.toString()),
            projection,
            options
        );

        return data;
    } catch (err) {
        throw err;
    }
}
