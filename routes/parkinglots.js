var express = require("express");
var router = express.Router();
const { ParkingLot, ParkingType } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//get all parking lots
router.get("/getall", async (req, res) => {
  //SELECT * FROM parkinglots
  try {
    let data = await ParkingLot.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [{ model: ParkingType, as: "Type" }],
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//create parkinglot
router.post("/add_parkinglot", async (req, res) => {
  let {
    userid,
    parkinglotname,
    parkinglotimage,
    parkinglotdescription,
    parkinglotaddress,
    parkinglotcontact,
    parkinglottypeid,
    parkinglotcapacity,
    parkinglotreserves,
    parkinglotstatus,
  } = req.body;
  try {
    let data = await ParkingLot.create({
      userid,
      parkinglotname,
      parkinglotimage,
      parkinglotdescription,
      parkinglotaddress,
      parkinglotcontact,
      parkinglottypeid,
      parkinglotcapacity,
      parkinglotreserves,
      parkinglotstatus,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//update parkinglot
router.put("/update_parkinglot", async (req, res) => {
  let {
    id,
    userid,
    parkinglotname,
    parkinglotimage,
    parkinglotdescription,
    parkinglotaddress,
    parkinglotcontact,
    parkinglottypeid,
    parkinglotcapacity,
    parkinglotreserves,
    parkinglotstatus,
  } = req.body;
  try {
    let data = await ParkingLot.update(
      {
        userid,
        parkinglotname,
        parkinglotimage,
        parkinglotdescription,
        parkinglotaddress,
        parkinglotcontact,
        parkinglottypeid,
        parkinglotcapacity,
        parkinglotreserves,
        parkinglotstatus,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//find parkinglot byuserid
router.get("/find_parkinglot_byuserid/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await ParkingLot.findAll({
      where: {
        userid: id,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//search parkinglot by name or address
router.get("/search_parkinglot/:keyword", async (req, res) => {
  let { keyword } = req.params;
  console.log(keyword);
  try {
    let data = await ParkingLot.findAll({
      where: {
        [Op.or]: [
          {
            parkinglotname: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            parkinglotaddress: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
