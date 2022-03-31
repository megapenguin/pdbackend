var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User, ParkingLot, ParkingType, Image } = require("../models");

const randomString = require("randomstring");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//find all images
router.get("/getall", async (req, res) => {
  //SELECT * FROM images
  try {
    let data = await Image.findAll();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//search images by imageownerid and imagetypeid
router.get("/search_image", async (req, res) => {
  let { imageownerid, imagetypeid } = req.query;
  //SELECT * FROM images WHERE imageownerid = ? AND imagetypeid = ?
  try {
    let data = await Image.findAll({
      where: {
        imageownerid: imageownerid,
        imagetypeid: imagetypeid,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//delete images by id
router.delete("/delete_image", async (req, res) => {
  let { id } = req.query;
  //DELETE FROM images WHERE id = ?
  try {
    let data = await Image.destroy({
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

//save images
router.post("/save_image", async (req, res) => {
  let { imageownerid, imagetypeid, smimagepath, mdimagepath, lgimagepath } =
    req.body;
  //INSERT INTO images (imageownerid, imagetypeid, smimagepath, mdimagepath, lgimagepath) VALUES (?, ?, ?, ?, ?)
  try {
    let data = await Image.create({
      imageownerid: imageownerid,
      imagetypeid: imagetypeid,
      smimagepath: smimagepath,
      mdimagepath: mdimagepath,
      lgimagepath: lgimagepath,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//upload images
router.post("/upload_image", async (req, res) => {
  let { imageownerid, imagetypeid } = req.body;
  console.log(imageownerid, imagetypeid);

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  const randomFileName = randomString.generate(15);
  const fileExtension = file.name.split(".");
  let inputBuffer = Buffer.from(file.data, "base64");
  console.log(file);

  try {
    sharp(inputBuffer)
      .resize(1024, 768, {
        fit: "contain",
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
      .toFile(
        `${__dirname}/../public/images/${randomFileName}-lg.${fileExtension[1]}`,
        (err, info) => {
          if (err) throw err;

          sharp(inputBuffer)
            .resize(640, 360, {
              fit: "contain",
            })
            .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
            .toFile(
              `${__dirname}/../public/images/${randomFileName}-md.${fileExtension[1]}`,
              (err, info) => {
                if (err) throw err;
                sharp(inputBuffer)
                  .resize(180, 180, {
                    fit: "contain",
                  })
                  .png({
                    compressionLevel: 9,
                    adaptiveFiltering: true,
                    force: true,
                  })
                  .toFile(
                    `${__dirname}/../public/images/${randomFileName}-sm.${fileExtension[1]}`,
                    (err, info) => {
                      if (err) throw err;
                      console.log(info);
                      const lgimagepath = `${randomFileName}-lg.${fileExtension[1]}`;
                      const smimagepath = `${randomFileName}-sm.${fileExtension[1]}`;
                      const mdimagepath = `${randomFileName}-md.${fileExtension[1]}`;
                      Image.create({
                        imageownerid,
                        imagetypeid,
                        smimagepath,
                        mdimagepath,
                        lgimagepath,
                      })
                        .then((response) => {
                          res.json(response);
                        })
                        .catch((error) => console.log(error));
                    }
                  );
              }
            );
        }
      );
  } catch (error) {
    console.log(error);
  }
});

function saveImageToDatabase() {
  Image.create({ imageOwnerId, imageReferenceId, imagePath })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
}

//delete folder image
router.delete("/delete_folder_image", async (req, res) => {
  let { fileName, fileId } = req.query;
  const imagePath = path.resolve("public", "images", fileName);
  try {
    let data = await Image.destroy({
      where: {
        id: fileId,
      },
    });
    const fileExtension = fileName.split("-");
    const imageName = fileExtension[0];
    const imageExtension = fileExtension[1].split(".");
    if (require("fs").existsSync(imagePath)) {
      fs.unlinkSync(`public/images/${imageName}-lg.${imageExtension[1]}`);
      fs.unlinkSync(`public/images/${imageName}-md.${imageExtension[1]}`);
      fs.unlinkSync(`public/images/${imageName}-sm.${imageExtension[1]}`);
    }
    //delete image from database
    let deletedData = await Image.destroy({
      where: {
        id: fileId,
      },
    });
    res.json(data, deletedData);
  } catch (error) {
    //console.log(error);
    // res.json(error);
  }
});

router.get("/:fileName", async (req, res) => {
  let fileName = req.params.fileName;
  // console.log(req.params);
  try {
    const imagePath = path.resolve("public", "images", fileName);

    if (require("fs").existsSync(imagePath)) {
      console.log(imagePath);
      res.sendFile(path.resolve("public", "images", fileName));
    } else {
      console.log("ERROR");
      res.json("none");
    }
  } catch (error) {
    console.log(error);
  }
});

function validateToken(req, res, next) {
  // console.log(req.headers);
  let authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(403);

  // console.log(authHeader);

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

module.exports = router;
