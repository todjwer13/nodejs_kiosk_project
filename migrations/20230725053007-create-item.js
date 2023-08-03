'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      optionId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Item',
          key: 'optionId',
        },
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('coffee', 'juice', 'food'),
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: 0,
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
    await queryInterface.dropTable('Items');
  },
};
