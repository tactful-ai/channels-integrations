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
          phoneNumber: "+15005550006",
          accountSid: "AC3513cc9085e35df95852d17874f95b28",
          authToken: "7270d98db5b4f19a9dd1fcb104c76b85",
          createdAt: new Date(),
          updatedAt: new Date(),
          bussinessId: 81,
        },
        {
          phoneNumber: "+12296964439",
          accountSid: "AC79212f5a0c1317d454eb10c1345a5f27",
          authToken: "1ca40c9ef3d2a2edf2a4007a04d217c8",
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
