var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, ParkingLot, ParkingType, Image } = require("../models");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const someOtherPlaintextPassword = "not_bacon";
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//register user
router.post("/register_user", async (req, res) => {
  let {
    username,
    firstname,
    lastname,
    password,
    email,
    contactnumber,
    address,
    profile,
    status,
    providerstatus,
  } = req.body;

  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return res.sendStatus(422);
        let data = User.create({
          username,
          firstname,
          lastname,
          password: hash,
          email,
          contactnumber,
          address,
          profile,
          status,
          providerstatus,
          adminStatus: false,
        });
        res.json(data);
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/getall", async (req, res) => {
  //SELECT * FROM users
  try {
    let data = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: ParkingLot,
          as: "Parkinglots",
          include: [{ model: ParkingType, as: "Type" }],
        },
        { model: Image, as: "Images" },
      ],
    });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//create user
router.post("/add_user", async (req, res) => {
  let {
    username,
    firstname,
    lastname,
    password,
    email,
    contactnumber,
    address,
    profile,
    status,
    providerstatus,
    adminStatus,
  } = req.body;

  try {
    let data = await User.create({
      username,
      firstname,
      lastname,
      password,
      email,
      contactnumber,
      address,
      profile,
      status,
      providerstatus,
      adminStatus,
    });
    delete data.dataValues.password;
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//update user
router.put("/update_user/:id", async (req, res) => {
  let {
    username,
    firstname,
    lastname,
    password,
    email,
    contactnumber,
    address,
    profile,
    status,
    providerstatus,
    adminStatus,
  } = req.body;
  console.log(req.body);
  try {
    let data = await User.update(
      {
        username,
        firstname,
        lastname,
        password,
        email,
        contactnumber,
        address,
        profile,
        status,
        providerstatus,
        adminStatus,
      },
      { where: { id: req.params.id } }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//delete user
router.delete("/delete_user", async (req, res) => {
  let { id } = req.body;
  try {
    let data = await User.destroy({
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

//search user
router.post("/search_user", async (req, res) => {
  let { search } = req.body;
  try {
    let data = await User.findAll({
      attributes: { exclude: ["password"] },
      where: {
        [Op.or]: [
          {
            id: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            firstname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
