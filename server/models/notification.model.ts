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
import Role from "./role.model";


@Table(
    {
        tableName: "notification",
        timestamps: false
    }
)
export default class Notification extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @Column
    text?: string;

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Column
    recipient_role?: number;
}