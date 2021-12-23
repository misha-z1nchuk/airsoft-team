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

}