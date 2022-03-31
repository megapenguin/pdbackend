"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parkingtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parkingtype.Parkinglot = Parkingtype.hasMany(models.ParkingLot, {
        as: "Parkinglot",
        foreignKey: "parkinglottypeid",
      });
    }
  }
  Parkingtype.init(
    {
      vehicle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ParkingType",
    }
  );
  return Parkingtype;
};
