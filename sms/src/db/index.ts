import { Sequelize, Options } from "sequelize";
import config from "../config";

const op: Options = config.db.options;

export const sequelize = new Sequelize(op);

export async function startDB() {
  await sequelize.authenticate();
}
