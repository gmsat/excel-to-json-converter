import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  'test-db2',
  'postgres',
  'admin', {
  host: 'localhost',
  dialect: 'postgres'
})