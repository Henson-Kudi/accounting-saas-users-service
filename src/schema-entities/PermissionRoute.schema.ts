import { Ref, prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import ProjectRoute from "./ProjectRoute.schema";
import Permission from "./Permission.schema";

export default class PermissionRoute extends BaseDocument {
    constructor(
        data: Pick<PermissionRoute, "route" | "permission"> &
            Omit<PermissionRoute, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.route = data.route;
        this.permission = data.permission;
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, ref: () => ProjectRoute })
    public route?: Ref<ProjectRoute>;

    @prop({ required: true, ref: () => Permission })
    public permission!: Ref<Permission>;
}
