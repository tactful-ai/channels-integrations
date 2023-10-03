'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstagramSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InstagramSettings.init({
    id: DataTypes.UUID,
    instagram_page_access_token: DataTypes.STRING,
    page_name: DataTypes.STRING,
    page_id: DataTypes.BIGINT,
    insta_account_username: DataTypes.STRING,
    insta_customer_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'InstagramSettings',
  });
  return InstagramSettings;
};