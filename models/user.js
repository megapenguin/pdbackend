"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.Parkinglots = User.hasMany(models.ParkingLot, {
        as: "Parkinglots",
        foreignKey: "userid",
      });
      User.Images = User.hasMany(models.Image, {
        as: "Images",
        foreignKey: "imageownerid",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      contactnumber: DataTypes.STRING,
      address: DataTypes.STRING,
      profile: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      providerstatus: DataTypes.BOOLEAN,
      adminStatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
