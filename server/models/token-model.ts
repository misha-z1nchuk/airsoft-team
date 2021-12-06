import {AutoIncrement, Column, Default, Model, PrimaryKey, Table} from "sequelize-typescript";

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


    @Default(false)
    @Column
    isActivated!: boolean


    @Column
    refreshToken!: string
}