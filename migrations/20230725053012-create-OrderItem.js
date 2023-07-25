'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItem', {
      orderItemId: {
        type: Sequelize.BIGINT,
      },
      itemId: {
        type: Sequelize.BIGINT,
      },
      amount: {
        type: Sequelize.BIGINT,
      },
      state: {
        type: Sequelize.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItem');
  },
};
