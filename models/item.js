'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Options, {
        targetKey: 'optionId',
        foreignKey: 'optionId',
      });

      this.hasMany(models.OrderItem, {
        targetKey: 'itemId',
        foreignKey: 'itemId',
      });

      this.hasOne(models.ItemOrderCustomer, {
        targetKey: 'itemId',
        foreignKey: 'itemId',
      });
    }
  }
  Item.init(
    {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      optionId: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      price: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0,
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
      modelName: 'Item',
    }
  );
  return Item;
};
