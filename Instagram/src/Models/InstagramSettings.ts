const { DataTypes, Model } = require('sequelize');
import { sequelize } from '../db';

/**
 * This variable is a model for the instagram configuration settings
 */

export const InstagramSettings = sequelize.define(
  'InstagramSettings',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    insta_page_access_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    page_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    page_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    insta_account_username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    insta_customer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    channel_id: {
      type: DataTypes.STRING
    },
    profile_id: {
      type: DataTypes.INTEGER
    },
    insta_base_path: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
);