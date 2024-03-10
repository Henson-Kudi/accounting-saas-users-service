import { Ref, prop } from "@typegoose/typegoose";
import BaseDocument from "./baseDocument";
import { User } from "./interRefs";
import Role from "./Role.schema";

class TeamMember {
    constructor(public member: Ref<User>, public isAdmin: boolean) {}
}

export default class Team extends BaseDocument {
    constructor(
        data: Pick<
            Team,
            "name" | "parentTeam" | "teamManager" | "teamMembers" | "roles"
        > &
            Omit<Team, "_id" | "id" | "updatedAt">
    ) {
        super();

        this.name = data.name;
        this.parentTeam = data.parentTeam;
        this.teamManager = data.teamManager;
        this.teamMembers = data.teamMembers;
        this.roles = data.roles;
        data.createdAt && (this.createdAt = data?.createdAt);
    }

    @prop({ required: true, trim: true, uppercase: true, default: "USERS" })
    public name!: string;

    @prop({ required: true, ref: () => Team })
    public parentTeam!: Ref<Team>;

    @prop({ required: true, ref: () => User })
    public teamManager!: Ref<User>;

    @prop({ required: true, type: () => TeamMember })
    public teamMembers!: TeamMember[]; //We are referencing members directly because we do not think a team would have so much amount of members
    @prop({ required: true, ref: Role })
    public roles!: Ref<Role>[]; //We do not expect a team to have soo many roles
}
