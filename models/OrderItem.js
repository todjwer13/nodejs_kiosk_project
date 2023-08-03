'use strict';
const { Model } = require('sequelize');

const orderItemState = {
  ORDERED: 'ORDERED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, {
        targetKey: 'itemId',
        foreignKey: 'itemId',
      });
    }
  }
  OrderItem.init(
    {
      orderItemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      state: {
        allowNull: false,
        type: DataTypes.ENUM(Object.values(orderItemState)),
        defaultValue: orderItemState.ORDERED,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'OrderItem',
    }
  );
  return OrderItem;
};
