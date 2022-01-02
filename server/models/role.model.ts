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
import Notification from "./notification.model";


@Table(
    {
        tableName: "role",
        timestamps: false
    }
)
export default class Role extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    name!: string

    @HasMany(() => Notification)
    notification!: Notification[]

}