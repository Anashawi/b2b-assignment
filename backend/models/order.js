"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    customerName: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  Order.associate = (models) => {
    Order.belongsToMany(models.Product, {
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId",
    });
  };

  return Order;
};
