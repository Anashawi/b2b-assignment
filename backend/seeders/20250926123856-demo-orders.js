"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Orders", [
      {
        customerName: "Alice Johnson",
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerName: "Bob Smith",
        status: "Completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerName: "Charlie Brown",
        status: "Cancelled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Orders", null, {});
  },
};
