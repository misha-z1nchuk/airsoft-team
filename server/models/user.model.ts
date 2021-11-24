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

export interface UserI{
    id?: number | null
    first_name: string
    last_name: string
    email: string
    password: string
}

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

    @AllowNull(false)
    @Default("USER")
    @Column
    role!: string;

    @ForeignKey(() => Team)
    @Column
    teamId!: number


    @BelongsTo(() => Team)
    team!: Team


}