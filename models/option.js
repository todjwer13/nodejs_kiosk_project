'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Item, {
        sourceKey: 'optionId',
        foreignKey: 'optionId',
      });
      this.hasMany(models.ItemOrderCustomer, {
        sourceKey: 'optionId',
        foreignKey: 'optionId',
      });
    }
  }
  Option.init(
    {
      optionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      extraPrice: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      shotPrice: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      hot: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      modelName: 'Option',
    }
  );
  return Option;
};
