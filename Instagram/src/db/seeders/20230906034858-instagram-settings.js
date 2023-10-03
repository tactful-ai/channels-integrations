'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkDelete('InstagramSettings', null, {});
    await queryInterface.bulkInsert('InstagramSettings', [{
      id: process.env.INSTAGRAM_SETTINGS_UUID,
      insta_page_access_token: process.env.INSTAGRAM_PAGE_ACCESS_TOKEN,
      page_name: process.env.INSTAGRAM_PAGE_NAME,
      page_id: process.env.INSTAGRAM_PAGE_ID,
      insta_account_username: process.env.INSTAGRAM_ACCOUNT_USERNAME,
      insta_customer_id: process.env.INSTAGRAM_CUSTOMER_ID,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('InstagramSettings', null, {});
  }
};
