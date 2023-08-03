'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemOrderCustomers', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      itemId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      orderCustomerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      optionId: {
        type: Sequelize.JSON,
        references: {
          model: 'Option',
          key: 'optionId',
        },
      },
      price: {
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
