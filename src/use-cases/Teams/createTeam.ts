//  Create a company

import mongoose, { FlattenMaps } from "mongoose";
import { TeamsDb } from "../../data-access";
import Team from "../../schema-entities/Team.schema";

export default async function createTeam(
    connection: mongoose.Connection,
    data: Team | Team[]
): Promise<FlattenMaps<Team> | FlattenMaps<Team>[]> {
    const created = await TeamsDb.create(connection, data);

    return created;
}
