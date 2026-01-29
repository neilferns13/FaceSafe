const express = require("express");
const multer = require("multer");
const router = express.Router();
const sql = require("../../sqlconn");
const fs = require("fs");
const { time } = require("console");

router.get("/getallfamily/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM family WHERE (Flat_no = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/getfamily/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM family WHERE (Fam_ID = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.delete("/delfamily/:id", (req, res) => {
  const sqlFetch = "SELECT imageUID FROM family WHERE (Fam_ID = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      var filePathFam = `${__dirname}/../../../Facesafe-React/public/images/Family/${result[0].imageUID}`;
      fs.unlinkSync(filePathFam);
      var filePathRecog = `${__dirname}/../../../Facesafe-Backend/faceimages/${result[0].imageUID}`;
      fs.unlinkSync(filePathRecog);
    }
  });

  const sqlDel = "DELETE FROM family WHERE (Fam_ID = ?)";
  sql.query(sqlDel, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

//image
const upload = multer();
router.post("/upload", upload.single("famPhoto"), function (req, res) {
  const famFlat = req.body.famFlat;
  const famName = req.body.famName;
  const famGender = req.body.famGender;
  const famAge = req.body.famAge;
  const famPhone = req.body.famPhone;
  const famRelation = req.body.famRelation;
  const file = req.file;

  if (!file.detectedFileExtension.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    res.send(new Error("Invalid File Type"));
  } else {
    const sqlInsert =
      "INSERT INTO family (Flat_no, Name, Gender, Age, Phone_no, Relation, Photo_Ext, imageUID) VALUES (?,?,?,?,?,?,?,?)";

    var datetime = new Date();
    const imgUID =
      "F" + famName + datetime.getTime() + file.detectedFileExtension;
    const imgaddr = "/images/Family/" + imgUID;

    var writestream = fs.createWriteStream(
      `${__dirname}/../../../Facesafe-React/public/images/Family/${imgUID}`
    );
    file.stream.pipe(writestream);

    var writestream = fs.createWriteStream(
      `${__dirname}/../../../Facesafe-Backend/faceimages/${imgUID}`
    );
    file.stream.pipe(writestream);

    sql.query(
      sqlInsert,
      [
        famFlat,
        famName,
        famGender,
        famAge,
        famPhone,
        famRelation,
        imgaddr,
        imgUID,
      ],
      (err, result) => {
        if (err) {
          console.log("Error: " + err.message);
        } else {
          console.log(result);
        }
      }
    );

    res.send("Done");
  }
});

module.exports = router;
