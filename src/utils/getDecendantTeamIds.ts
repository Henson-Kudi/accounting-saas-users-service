import mongoose from "mongoose";
import ID from "../types/ID";
import { TeamsRepo, UsersRepo } from "../use-cases";

/**
 * @description This utility function helps us to recursively get all decendant team ids of a given team leader (department leader) and fetch all activities or tasks or properties or whatever with these ids. NOTE. For this to work, we must create activities or properties with team ids and createdAt ids
 * @param connection Mongoose connection object
 * @param parentTeamId The team id for whom we want to get subordinates (sub teams)
 * @param teamIds list of team ids which are subordinates to the given parent team id
 * @returns Promise<ID[]> A list of all the team ids that are subordinates to the given parent team id
 */

export default async function fetchDescendantTeamIds(
    connection: mongoose.Connection,
    parentTeamId: ID,
    teamIds: ID[] = []
) {
    try {
        const childTeams = await TeamsRepo.findTeams(connection, {
            parentTeam: parentTeamId,
        });

        if (Array.isArray(childTeams)) {
            for (const childTeam of childTeams) {
                teamIds.push(childTeam._id);
                teamIds = await fetchDescendantTeamIds(
                    connection,
                    childTeam._id,
                    teamIds
                );
            }
        }

        return teamIds;
    } catch (error) {
        console.error("Error fetching descendant team IDs:", error);
        throw error; // Re-throw to propagate errors
    }
}

/**
 * @description A utility function to help us fetch all subordinates (including nested subordinates of a user)
 * @param connection Mongoose connection object
 * @param managerId The user id for whom we want to get subordinates
 * @param subordinates list of user ids which are subordinates to the given manager id
 * @returns Promise<ID[]> A list of all the user ids that are subordinates to the given manager id
 */
export async function fetchMangerSubordinates(
    connection: mongoose.Connection,
    managerId: ID,
    subordinates: ID[] = []
): Promise<ID[]> {
    try {
        const directSubordinates = await UsersRepo.findUsers(connection, {
            manager: managerId,
        });

        if (Array.isArray(directSubordinates) && directSubordinates.length) {
            for (const subordinate of directSubordinates) {
                subordinates.push(subordinate?._id ?? subordinate?.id);
                subordinates = await fetchMangerSubordinates(
                    connection,
                    subordinate?.id ?? subordinate?._id,
                    subordinates
                );
            }
        }

        return subordinates;
    } catch (err) {
        throw err;
    }
}

// this utility function helps us to recursively get both team leaders and decendant teams of a particular team

export async function fetchDescendantAndParentTeamIds(
    connection: mongoose.Connection,
    parentTeamId: ID,
    teamIds: ID[] = [],
    visitedTeams: Set<string> = new Set()
) {
    try {
        const team = await TeamsRepo.findTeamById(connection, parentTeamId);

        if (visitedTeams.has(parentTeamId.toString())) {
            return teamIds; // Prevent infinite loops due to circular references
        }

        teamIds.push(team?.id!);
        visitedTeams.add(parentTeamId.toString());

        if (team?.parentTeam) {
            teamIds = await fetchDescendantAndParentTeamIds(
                connection,
                team.parentTeam as ID,
                teamIds,
                visitedTeams
            );
        }

        const childTeams = await TeamsRepo.findTeams(connection, {
            parentTeam: parentTeamId,
        });

        if (Array.isArray(childTeams)) {
            for (const childTeam of childTeams) {
                teamIds = await fetchDescendantAndParentTeamIds(
                    connection,
                    childTeam._id,
                    teamIds,
                    visitedTeams
                );
            }
        }

        return teamIds;
    } catch (error) {
        console.error("Error fetching descendant team IDs:", error);
        throw error; // Re-throw to propagate errors
    }
}
