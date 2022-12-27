import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connectionStr = process.env.DB_PG || "";

export async function connectDb(_str: string = connectionStr) {
  const sequelize = new Sequelize(_str);
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to database successfully!")
    })
    .catch((e) => {
      console.error("Error, connection failed!", e)
    });
}

