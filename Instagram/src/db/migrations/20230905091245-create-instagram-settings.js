'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InstagramSettings', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      instagram_page_access_token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      page_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      page_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      insta_account_username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      insta_customer_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InstagramSettings');
  }
};