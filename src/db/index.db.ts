import { getModelForClass } from "@typegoose/typegoose";
import {
    AnyParamConstructor,
    BeAnObject,
    ReturnModelType,
} from "@typegoose/typegoose/lib/types";
import { Connection } from "mongoose";

export default function getMongooseModelForClass<T>(
    schemaClass: AnyParamConstructor<T>,
    connection: Connection
): ReturnModelType<AnyParamConstructor<T>, BeAnObject> {
    try {
        const model = getModelForClass<AnyParamConstructor<T>, BeAnObject>(
            schemaClass,
            {
                existingConnection: connection,
            }
        );

        return model;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
