import { Ref, prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import Permission from "./Permission.schema";

export default class Role extends BaseDocument {
    constructor(
        data: Pick<Role, "name" | "permissions"> &
            Omit<Role, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.name = data.name;
        this.permissions = data.permissions;
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, trim: true, unique: true })
    public name!: string;
    
    @prop({ required: true, ref: () => Permission })
    public permissions!: Ref<Permission>[];
}
