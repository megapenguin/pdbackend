var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, ParkingLot, ParkingType, Transaction } = require("../models");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/get_all", async (req, res) => {
  //SELECT * FROM users
  try {
    let data = await Transaction.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//create transaction
router.post("/add_transaction", async (req, res) => {
  let { providerId, userId, platenumber, parkingStart, parkingEnd } = req.body;
  try {
    let data = await Transaction.create({
      providerId,
      userId,
      platenumber,
      parkingStart,
      parkingEnd,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

//search transaction by providerId
router.post("/search_platenumber", async (req, res) => {
  let { providerId, platenumber } = req.body;

  try {
    let data = await Transaction.findAll({
      where: {
        providerId: providerId,
        platenumber: platenumber,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update transaction
router.put("/update_transaction", async (req, res) => {
  let { id, parkingEnd } = req.body;
  try {
    let data = await Transaction.update(
      {
        parkingEnd: parkingEnd,
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
    res.json(error);
  }
});

//delete transaction
router.delete("/delete_transaction", async (req, res) => {
  let { id } = req.body;
  try {
    let data = await Transaction.destroy({
      where: {
        id: id,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
