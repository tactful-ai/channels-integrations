"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Twilio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Twilio.init(
    {
      phoneNumber: DataTypes.STRING,
      accountSid: DataTypes.STRING,
      authToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Twilio",
    }
  );
  return Twilio;
};
