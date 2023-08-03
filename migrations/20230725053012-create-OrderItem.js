'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orderItemState = {
      ORDERED: 'ORDERED',
      PENDING: 'PENDING',
      COMPLETED: 'COMPLETED',
      CANCELED: 'CANCELED',
    };
    await queryInterface.createTable('OrderItems', {
      orderItemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      itemId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Items',
          key: 'itemId',
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM('ORDERED', 'PENDING', 'COMPLETED', 'CANCELED'),
        defaultValue: orderItemState.ORDERED,
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
    await queryInterface.dropTable('OrderItems');
  },
};
