const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, ParkingLot, ParkingType, Image } = require("../models");

router.post("/", validateToken, (req, res) => {
  let decode = req.decode;

  let token = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
    expiresIn: "15m",
  });

  return res.json({ token, userData: decode });
});

function validateToken(req, res, next) {
  console.log(req.headers);
  let authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(403);

  console.log(authHeader);

  let token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(
    token,
    process.env.PUBLIC_KEY,
    { algorithms: ["HS256"] },
    (error, decode) => {
      console.log(error);
      if (error) return res.sendStatus(403);
      req.decode = decode;
      next();
    }
  );
}

//authenticate login

router.post("/auth_login", async (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  User.findOne({
    where: { email },
    include: [
      {
        model: Image,
        as: "Images",
        where: { imagetypeid: 1 },
        required: false,
      },
    ],
  }).then((user) => {
    if (user === null) return res.sendStatus(422);
    // console.log(user)

    bcrypt.compare(password, user.password, (err, status) => {
      // console.log(err, status)

      if (status === false) return res.sendStatus(422);
      //dahil kailangan mo ng id sa code mo ipasa narin natin ang id

      let userPayload = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        // password: user.password,
        contactnumber: user.contactnumber,
        address: user.address,
        profile: user.profile,
        status: user.status,
        providerstatus: user.providerstatus,
        adminStatus: user.adminStatus,
      };
      //console.log(userPayload)
      let token = jwt.sign(userPayload, process.env.PUBLIC_KEY, {
        expiresIn: "8h",
      });
      jwt.verify(token, process.env.PUBLIC_KEY, (error, decode) => {
        if (error) {
          console.log(error);
          return res.sendStatus(403);
        }

        let secureToken = jwt.sign({ decode }, process.env.PRIVATE_KEY, {
          expiresIn: "15m",
          algorithm: "HS256",
        });
        res.json({ token, userData: userPayload, secureToken });
      });
    });
  });
});
module.exports = router;
