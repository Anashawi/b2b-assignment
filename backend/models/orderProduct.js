"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define("OrderProduct", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  return OrderProduct;
};
