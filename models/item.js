'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  item.init({
    item_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    option_id: DataTypes.BIGINT,
    price: DataTypes.BIGINT,
    type: DataTypes.ENUM,
    amount: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};