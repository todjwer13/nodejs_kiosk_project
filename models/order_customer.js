'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_customer.init({
    oreder_customer_id: DataTypes.BIGINT,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'order_customer',
  });
  return order_customer;
};