"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, {
      through: models.OrderProduct,
      foreignKey: "productId",
      otherKey: "orderId",
    });
  };

  return Product;
};
