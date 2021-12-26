import {
    AllowNull,
    AutoIncrement, BelongsTo,
    Column, ForeignKey,
    HasMany, Is, IsIn,
    Model,
    NotEmpty,
    PrimaryKey,
    Table, Unique
} from "sequelize-typescript";
import User from "./user.model";
import Team from "./team.model";


@Table(
    {
        tableName: "request",
        timestamps: false
    }
)
export default class Request extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @Unique(true)
    @ForeignKey(() => User)
    @Column
    author_id!: number;


    @BelongsTo(() => User)
    user!: User;

    //TODO: VALIDATION (only allowed actions)
    @Column
    action!: string;

    @ForeignKey(() => Team)
    @Column
    team_id!: number;



}