import { DataTypes } from "sequelize";
import { sequelize } from "./index";

export const Twilio = sequelize.define(
  "Twilio",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accountSid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bussinessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Business",
        key: "profileId",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
