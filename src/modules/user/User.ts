import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database/sequelize";
import dotenv from "dotenv";
dotenv.config();

class User extends Model {
  public id!: number;
  public name!: string;
  public nick_name!: string;
  public email!: string;
  public backup_email: string = 'some.email@gmail.com';
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    nick_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    backup_email: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: true
  }
);

export default User;