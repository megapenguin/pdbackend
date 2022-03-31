"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "ParkingTypes",
      [
        {
          vehicle: "Car",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vehicle: "Motorcycle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vehicle: "Truck",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ParkingTypes", null, {});
  },
};
