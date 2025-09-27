"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Sample Widget",
        description: "A simple widget",
        price: 9.99,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gadget",
        description: "A useful gadget",
        price: 19.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thingamajig",
        description: "An advanced thingamajig",
        price: 29.99,
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
