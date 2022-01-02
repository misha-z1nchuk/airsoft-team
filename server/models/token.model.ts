import {
    AutoIncrement,
    BelongsTo,
    Column, DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import User from "./user.model";
import {SequelizeHooks} from "sequelize/types/lib/hooks";
import {Sequelize} from "sequelize";

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


    @Column({
        type: DataType.STRING(500)
    })
    refreshToken!: string;
}