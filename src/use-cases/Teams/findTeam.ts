// Functionalities for finding (searching a team)

import mongoose, { FlattenMaps } from "mongoose";
import { TeamsDb } from "../../data-access";
import ID from "../../types/ID";
import Team from "../../schema-entities/Team.schema";

export async function findTeams(
    connection: mongoose.Connection,
    params?: mongoose.FilterQuery<Team>,
    projection?: mongoose.ProjectionType<Team>,
    options?: mongoose.QueryOptions
): Promise<FlattenMaps<Team>[] | null> {
    try {
        const data = await TeamsDb.find(
            connection,
            params ?? {},
            projection,
            options
        );

        return data;
    } catch (err) {
        throw err;
    }
}

export async function findOneTeam(
    connection: mongoose.Connection,
    params?: mongoose.FilterQuery<Team>,
    projection?: mongoose.ProjectionType<Team>,
    options?: mongoose.QueryOptions
): Promise<FlattenMaps<Team>|null> {
    try {
        const data = await TeamsDb.findOne(
            connection,
            params ?? {},
            projection,
            options
        );

        return data;
    } catch (err) {
        throw err;
    }
}

export async function findTeamById(
    connection: mongoose.Connection,
    id: ID,
    projection?: mongoose.ProjectionType<Team>,
    options?: mongoose.QueryOptions
): Promise<FlattenMaps<Team> | null> {
    try {
        const data = await TeamsDb.findById(
            connection,
            new mongoose.Types.ObjectId(id),
            projection,
            options
        );

        return data;
    } catch (err) {
        throw err;
    }
}
