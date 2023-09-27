"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Business",
      [
        {
          profileId: 81,
          name: "business1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          profileId: 83,
          name: "business2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "Twilio",
      [
        {
          phoneNumber: process.env.TEST_PHONE_NUMBER,
          accountSid: process.env.ACC_TEST_SID,
          authToken: process.env.ACC_TEST_TOKEN,
          createdAt: new Date(),
          updatedAt: new Date(),
          bussinessId: 81,
        },
        {
          phoneNumber: process.env.PHONE_NUMBER,
          accountSid: process.env.ACC_SID,
          authToken: process.env.ACC_TOKEN,
          createdAt: new Date(),
          updatedAt: new Date(),
          bussinessId: 83,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Twilio", null, {});
    await queryInterface.bulkDelete("Business", null, {});
  },
};
