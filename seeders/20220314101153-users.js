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
    await queryInterface.bulkInsert(`Users`, [
      {
        id: "1",
        username: "client1",
        firstname: "Rex",
        lastname: "Villa",
        email: "rexvillajr@gmail.com",
        password:
          "$2b$10$JKXvW4L01KwtT.Wm1o9moOLXa0o.6b18H21lZJVxt4mbOXgHKbWAC",
        contactnumber: "09754685428",
        address: "Recodo, Zambales",
        profile: "",
        status: true,
        providerstatus: false,
        adminStatus: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        username: "client2",
        firstname: "Sitti Shana",
        lastname: "Maldisa",
        email: "sittishanamaldisa@gmail.com",
        password:
          "$2b$10$JKXvW4L01KwtT.Wm1o9moOLXa0o.6b18H21lZJVxt4mbOXgHKbWAC",
        contactnumber: "09754685428",
        address: "Guiwan, Zambales",
        profile: "",
        status: true,
        providerstatus: false,
        adminStatus: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        username: "client3",
        firstname: "Rocelyn",
        lastname: "Fernandez",
        email: "rocelynfernandez@gmail.com",
        password:
          "$2b$10$JKXvW4L01KwtT.Wm1o9moOLXa0o.6b18H21lZJVxt4mbOXgHKbWAC",
        contactnumber: "09754685428",
        address: "Recodo, Zambales",
        profile: "",
        status: true,
        providerstatus: false,
        adminStatus: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
