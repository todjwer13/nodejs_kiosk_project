'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemOrderCustomers', {
      itemId: {
        allowNull: false,
        references: {
          model: 'Items',
          key: 'itemId',
        },
        type: Sequelize.BIGINT,
      },
      orderCustomerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'OrderCustomers',
          key: 'orderCustomerId',
        },
      },
      amount: {
        allowNull: false,
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
    await queryInterface.dropTable('ItemOrderCustomers');
  },
};
