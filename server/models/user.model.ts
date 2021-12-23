import {
    Model,
    Table,
    AutoIncrement,
    PrimaryKey,
    Column,
    AllowNull,
    NotEmpty,
    Unique,
    Default, BelongsTo, ForeignKey
} from "sequelize-typescript";
import Team from "./team.model";
import {UserI} from "../global/types";
import Role from "./role.model";


@Table(
    {
        tableName: "user",
        timestamps: false
    }
)
export default class User extends Model implements UserI{

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    first_name!: string

    @AllowNull(false)
    @NotEmpty
    @Column
    last_name!: string;

    @AllowNull(false)
    @NotEmpty
    @Unique(true)
    @Column
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column
    role!: number;


    @ForeignKey(() => Team)
    @Column
    teamId!: number;


    @BelongsTo(() => Team)
    team!: Team;

    @Default(false)
    @Column
    isActivated!: boolean;


    @Column
    activationLink!: string;
}