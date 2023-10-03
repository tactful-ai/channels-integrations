'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'InstagramSettings',
        'instagram_page_access_token',
        { transaction }
      );
      await queryInterface.addColumn(
        'InstagramSettings',
        'insta_page_access_token',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn(
        'InstagramSettings',
        'insta_page_access_token',
        { transaction }
      );
      await queryInterface.addColumn(
        'InstagramSettings',
        'instagram_page_access_token',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
