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
      await queryInterface.addColumn(
        'InstagramSettings',
        'profile_id',
        {
          type: Sequelize.DataTypes.INTEGER
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      console.log('Migration failed! Error:-\n', err);
      await transaction.rollback();
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
        'profile_id',
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      console.log('Migration failed! Error:-\n', err);
      await transaction.rollback();
    }
  }
};
