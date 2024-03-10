import "dotenv/config";
import mongoose from "mongoose";

import LRUCache from "../config/ttl-lru-cache";

export const updateDatabaseConnections = (
    dbName: string
): mongoose.Connection => {
    try {
        const adminBaseDbUrl = process.env.ADMIN_BASE_DB_URL;

        const dbUrl = adminBaseDbUrl + dbName;

        if (!adminBaseDbUrl) {
            throw new Error("provide base db url");
        }

        if (!dbName) {
            throw new Error("dbName is required");
        }

        const dbConnection = LRUCache.get(dbName);

        if (dbConnection && dbConnection instanceof mongoose.Connection) {
            return dbConnection;
        }

        const newConnection = mongoose.createConnection(dbUrl);

        LRUCache.set(dbName, newConnection);

        return newConnection;
    } catch (err) {
        throw err;
    }
};
