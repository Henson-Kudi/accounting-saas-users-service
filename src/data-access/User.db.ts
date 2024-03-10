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
import User from "../schema-entities/User.schema";
import getMongooseModelForClass from "../db/index.db";

// Access to users collection

// CREATING DATA
export const create = async function (
    connection: Connection,
    documents: User | User[]
): Promise<FlattenMaps<User> | FlattenMaps<User>[]> {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

        const created = await (
            await model.create(documents)
        ).populate("manager");

        const jsonData: FlattenMaps<User> | FlattenMaps<User>[] = Array.isArray(
            created
        )
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
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User>[]> {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

        const foundData = await model.find(filter, projection, options);

        return foundData?.map((item) => item?.toJSON());
    } catch (err) {
        throw err;
    }
};

export const findOne = async function (
    connection: Connection,
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User> | null> {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

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
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User> | null> {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

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
    filter: FilterQuery<User>,
    update: UpdateQuery<Omit<User, "id" | "_id" | "updatedAt" | "createdAt">>,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User> | undefined> => {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

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
    update: UpdateQuery<Omit<User, "id" | "_id" | "updatedAt" | "createdAt">>,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User> | undefined> => {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

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
    filter: FilterQuery<User>,
    update:
        | UpdateWithAggregationPipeline
        | UpdateQuery<Omit<User, "id" | "_id" | "updatedAt" | "createdAt">>
        | Omit<User, "id" | "_id" | "updatedAt" | "createdAt">,
    options?: mongo.UpdateOptions
): Promise<UpdateWriteOpResult> => {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

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
    filter: FilterQuery<User>,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User> | undefined> => {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

        const deleted = await model.findOneAndDelete(filter, options);

        return deleted?.toJSON();
    } catch (err) {
        throw err;
    }
};
export const findByIdAndDelete = async (
    connection: Connection,
    id: Types.ObjectId,
    options?: QueryOptions<User>
): Promise<FlattenMaps<User> | undefined> => {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

        const deleted = await model.findByIdAndDelete(id, options);

        return deleted?.toJSON();
    } catch (err) {
        throw err;
    }
};

export const deleteMany = async (
    connection: Connection,
    filter: FilterQuery<User>,
    options?: mongo.DeleteOptions
): Promise<mongo.DeleteResult> => {
    try {
        const model = getMongooseModelForClass<User>(User, connection);

        const deleted = await model.deleteMany(filter, options);

        return deleted;
    } catch (err) {
        throw err;
    }
};
