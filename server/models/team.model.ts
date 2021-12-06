import {
    AllowNull,
    AutoIncrement,
    Column,
    HasMany,
    Model,
    NotEmpty,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import User from "./user.model";
import {TeamI} from "../global/types";


@Table(
    {
        tableName: "team",
        timestamps: false
    }
)
export default class Team extends Model implements TeamI{

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    team_name!: string

    @HasMany(() => User)
    players!: User[]
}