import { Ref, prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import Joi from "@hapi/joi";
import { Team } from "./interRefs";
import Role from "./Role.schema";

const emailSchema = Joi.string().email().required();

export default class User extends BaseDocument {
    constructor(
        data: Pick<
            User,
            "fullName" | "email" | "phone" | "password" | "company"
        > &
            Omit<User, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.fullName = data.fullName;
        this.email = data.email;
        this.phone = data.phone;
        this.whatsApp && (this.whatsApp = data.whatsApp);
        this.password = data.password;
        this.manager && (this.manager = data.manager);
        this.company = data.company;
        this.isRootUser = data.isRootUser ?? false;
        this.userTeams = data?.userTeams;
        this.roles = data.roles ?? [];
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({
        required: true,
        trim: true,
    })
    public fullName!: string;

    @prop({
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value: string) => {
                const { error } = emailSchema.validate(value);
                return !error;
            },
            message: (props: any) => props?.reason?.message,
        },
        index: true,
    })
    public email!: string;

    @prop({
        trim: true,
        unique: true,
        required: true,
    })
    public phone!: string;

    @prop({
        trim: true,
        unique: true,
        required: true,
    })
    public whatsApp?: string;

    @prop({
        required: true,
    })
    public password!: string;

    @prop({
        ref: () => User,
        required: function () {
            return !this.isRootUser;
        },
    })
    public manager?: Ref<User>;

    @prop({
        required: true,
    })
    public company!: string;

    @prop({
        default: false,
    })
    public isRootUser?: boolean;

    @prop({
        ref: () => Team,
    })
    public userTeams?: Ref<Team>[]; // teams to which a user belongs. We do not expect user to belong to soo many teams

    @prop({ required: true, ref: Role })
    public roles?: Ref<Role>[]; //We do not expect a user to have soo many roles
}
