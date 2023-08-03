'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrderCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.OrderCustomer, {
        targetKey: 'orderCustomerId',
        foreignKey: 'orderCustomerId',
      });
      this.hasOne(models.Item, {
        targetKey: 'itemId',
        foreignKey: 'itemId',
      });
      this.belongsTo(models.Option, {
        sourceKey: 'optionId',
        foreignKey: 'optionId',
      });
    }
  }
  ItemOrderCustomer.init(
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      itemId: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      orderCustomerId: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      optionId: {
        type: DataTypes.JSON,
      },
      price: {
        allowNull: false,
        type: DataTypes.BIGINT,
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
      modelName: 'ItemOrderCustomer',
    }
  );
  return ItemOrderCustomer;
};
