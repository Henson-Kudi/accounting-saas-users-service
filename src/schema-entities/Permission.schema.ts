import { prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";

export default class Permission extends BaseDocument {
    constructor(
        data: Pick<Permission, "name"> &
            Omit<Permission, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.name = data.name;
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, trim: true, unique: true })
    public name?: string;

    // ...NEED TO CONFIGURE OTHERS.
    // THIS SHOULD THEN MAP TO ROUTES (CALLED PERMISSIONrOUTES)
    // THEN ROLE WITH REF THESE PERMISSIONS AS ARRAY.
}
