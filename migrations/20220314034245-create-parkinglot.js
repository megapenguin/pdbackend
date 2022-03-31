"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Parkinglots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.STRING,
      },
      parkinglotname: {
        type: Sequelize.STRING,
      },
      parkinglotimage: {
        type: Sequelize.STRING,
      },
      parkinglotdescription: {
        type: Sequelize.STRING,
      },
      parkinglotaddress: {
        type: Sequelize.STRING,
      },
      parkinglotcontact: {
        type: Sequelize.STRING,
      },
      parkinglottypeid: {
        type: Sequelize.STRING,
      },
      parkinglotcapacity: {
        type: Sequelize.INTEGER,
      },
      parkinglotreserves: {
        type: Sequelize.INTEGER,
      },
      parkinglotstatus: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Parkinglots");
  },
};
