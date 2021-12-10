import {AutoIncrement, BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import User from "./user.model";

@Table(
    {
        tableName: "token",
        timestamps: false
    }
)

export default class Token extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number



    @ForeignKey(() => User)
    @Column
    userId!: number;


    @BelongsTo(() => User)
    user!: User;


    @Default(false)
    @Column
    isActivated!: boolean


    @Column
    refreshToken!: string
}