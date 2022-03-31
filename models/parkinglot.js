"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parkinglot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parkinglot.Type = Parkinglot.belongsTo(models.ParkingType, {
        as: "Type",
        foreignKey: "parkinglottypeid",
      });

      Parkinglot.User = Parkinglot.belongsTo(models.User, {
        as: "User",
        foreignKey: "userid",
      });
    }
  }
  Parkinglot.init(
    {
      userid: DataTypes.INTEGER,
      parkinglotname: DataTypes.STRING,
      parkinglotimage: DataTypes.STRING,
      parkinglotdescription: DataTypes.STRING,
      parkinglotaddress: DataTypes.STRING,
      parkinglotcontact: DataTypes.STRING,
      parkinglottypeid: DataTypes.INTEGER,
      parkinglotcapacity: DataTypes.INTEGER,
      parkinglotreserves: DataTypes.INTEGER,
      parkinglotstatus: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ParkingLot",
    }
  );
  return Parkinglot;
};
