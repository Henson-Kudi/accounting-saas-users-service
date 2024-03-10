import { prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";

export default class ProjectRoute extends BaseDocument {
    constructor(
        data: Pick<
            ProjectRoute,
            "routeName" | "routeUrl" | "routeMethod" | "method"
        > &
            Omit<ProjectRoute, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.method = data.method;
        this.projectName = data.projectName;
        this.routeMethod = data.routeMethod;
        this.routeName = data.routeName;
        this.routeUrl = data.routeUrl;
        data.createdAt && (this.createdAt = data?.createdAt);
        data.projectName && (this.projectName = data?.projectName);
    }

    @prop({ required: true, trim: true, uppercase: true, default: "USERS" })
    public projectName?: string;

    @prop({ required: true, trim: true, unique: true })
    public routeName!: string;

    @prop({ required: true, trim: true, unique: true })
    public routeUrl!: string;

    @prop({ required: true, trim: true, uppercase: true })
    public routeMethod!: string;

    @prop({ required: true, trim: true, uppercase: true })
    public method!: string;
}
