import { DataTypes, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class Post extends Model {
  public post_id!: number;
  public post_title!: string;
  public poster_user_name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    post_title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    poster_user_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    created_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
    updated_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    }
  },
  {
    tableName: 'user',
    sequelize: new Sequelize(`${process.env.DB_PG}`), // replace with your connection details
  }
);

export default Post;