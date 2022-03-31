"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.Users = Image.belongsTo(models.User, {
        as: "Users",
        foreignKey: "imageownerid",
      });

      Image.Parkingimage = Image.belongsTo(models.ParkingLot, {
        as: "Parkingimage",
        foreignKey: "imageownerid",
      });
    }
  }
  Image.init(
    {
      imageownerid: DataTypes.INTEGER,
      imagetypeid: DataTypes.INTEGER,
      smimagepath: DataTypes.STRING,
      mdimagepath: DataTypes.STRING,
      lgimagepath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
