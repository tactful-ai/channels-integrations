import dotenv from "dotenv";
import { Options } from "sequelize";
dotenv.config({ path: "./.env" });

const config: {
  bus: { redisUrl: string };
  db: { options: Options };
} = {
  bus: { redisUrl: process.env.REDIS_BUS_URL! },
  db: {
    options: {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT!) || 5432,
      database: process.env.DB_DATABASE,
      dialect: "postgres",
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },
};

export default config;
