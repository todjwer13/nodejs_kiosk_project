'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_item.init({
    order_item_id: DataTypes.BIGINT,
    item_id: DataTypes.BIGINT,
    amount: DataTypes.BIGINT,
    state: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'order_item',
  });
  return order_item;
};