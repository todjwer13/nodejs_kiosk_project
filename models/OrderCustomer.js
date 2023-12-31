'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ItemOrderCustomer, {
        sourceKey: 'orderCustomerId',
        foreignKey: 'orderCustomerId',
      });
    }
  }
  OrderCustomer.init(
    {
      orderCustomerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      state: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: 'OrderCustomer',
    }
  );
  return OrderCustomer;
};
