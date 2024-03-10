import {
    Connection,
    FilterQuery,
    FlattenMaps,
    ProjectionType,
    QueryOptions,
    Types,
    UpdateQuery,
    mongo,
    UpdateWithAggregationPipeline,
    UpdateWriteOpResult,
} from "mongoose";
import Team from "../schema-entities/Team.schema";
import getMongooseModelForClass from "../db/index.db";

// Access to teams collection

// CREATING DATA
export const create = async function (
    connection: Connection,
    documents: Team | Team[]
): Promise<FlattenMaps<Team> | FlattenMaps<Team>[]> {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const created = await model.create(documents);

        const jsonData = Array.isArray(created)
            ? created?.map((item) => item?.toJSON())
            : created?.toJSON();

        return jsonData;
    } catch (err) {
        throw err;
    }
};

// FINDING DATA
export const find = async function (
    connection: Connection,
    filter: FilterQuery<Team>,
    projection?: ProjectionType<Team>,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team>[]> {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const foundData = await model.find(filter, projection, options);

        return foundData?.map((item) => item?.toJSON());
    } catch (err) {
        throw err;
    }
};

export const findOne = async function (
    connection: Connection,
    filter: FilterQuery<Team>,
    projection?: ProjectionType<Team>,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team> | null> {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const foundData = await model.findOne(filter, projection, options);

        if (!foundData) {
            return null;
        }

        return foundData?.toJSON();
    } catch (err) {
        throw err;
    }
};

export const findById = async function (
    //Since ids are indexed by default, this method makes queries much faster
    connection: Connection,
    id: Types.ObjectId,
    projection?: ProjectionType<Team>,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team> | null> {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const foundData = await model.findById(id, projection, options);

        if (!foundData) {
            return null;
        }

        return foundData?.toJSON();
    } catch (err) {
        throw err;
    }
};

// UPDATING DATA
export const findOneAndUpdate = async (
    connection: Connection,
    filter: FilterQuery<Team>,
    update: UpdateQuery<Omit<Team, "id" | "_id" | "updatedAt" | "createdAt">>,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team> | undefined> => {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const updated = await model.findOneAndUpdate(filter, update, {
            ...options,
            new: options?.new ?? true,
        });

        return updated?.toJSON();
    } catch (err) {
        throw err;
    }
};

export const findByIdAndUpdate = async (
    connection: Connection,
    id: Types.ObjectId,
    update: UpdateQuery<Omit<Team, "id" | "_id" | "updatedAt" | "createdAt">>,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team> | undefined> => {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const updated = await model.findByIdAndUpdate(id, update, {
            ...options,
            new: options?.new ?? true,
        });

        return updated?.toJSON();
    } catch (err) {
        throw err;
    }
};

export const updateMany = async (
    connection: Connection,
    filter: FilterQuery<Team>,
    update:
        | UpdateWithAggregationPipeline
        | UpdateQuery<Omit<Team, "id" | "_id" | "updatedAt" | "createdAt">>
        | Omit<Team, "id" | "_id" | "updatedAt" | "createdAt">,
    options?: mongo.UpdateOptions
): Promise<UpdateWriteOpResult> => {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const updated = await model.updateMany(filter, update, {
            ...options,
        });

        return updated;
    } catch (err) {
        throw err;
    }
};

// DELETING DATA
export const findOneAndDelete = async (
    connection: Connection,
    filter: FilterQuery<Team>,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team> | undefined> => {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const deleted = await model.findOneAndDelete(filter, options);

        return deleted?.toJSON();
    } catch (err) {
        throw err;
    }
};
export const findByIdAndDelete = async (
    connection: Connection,
    id: Types.ObjectId,
    options?: QueryOptions<Team>
): Promise<FlattenMaps<Team> | undefined> => {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const deleted = await model.findByIdAndDelete(id, options);

        return deleted?.toJSON();
    } catch (err) {
        throw err;
    }
};

export const deleteMany = async (
    connection: Connection,
    filter: FilterQuery<Team>,
    options?: mongo.DeleteOptions
): Promise<mongo.DeleteResult> => {
    try {
        const model = getMongooseModelForClass<Team>(Team, connection);

        const deleted = await model.deleteMany(filter, options);

        return deleted;
    } catch (err) {
        throw err;
    }
};
