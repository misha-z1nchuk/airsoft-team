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
import {Col} from "sequelize/types/lib/utils";

export interface TeamI{
    id?: number | null
    team_name: string
    players: User[]
}

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