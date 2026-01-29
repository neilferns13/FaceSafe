const express = require("express");
const multer = require("multer");
const router = express.Router();
const sql = require("../../sqlconn");
const fs = require("fs");

router.post("/insert", (req, res) => {
  const staffName = req.body.staffName;
  const staffGender = req.body.staffGender;
  const staffAge = req.body.staffAge;
  const staffFlat = req.body.staffFlat;
  const staffPhone = req.body.staffPhone;
  const staffProfession = req.body.staffProfession;
  const staffStartTime = req.body.staffStartTime;
  const staffEndTime = req.body.staffEndTime;

  const sqlInsert =
    "INSERT INTO staff (Flat_no, Name, Gender, Age, Phone_no, Profession, Working_hours_from, Working_hours_to) VALUES (?,?,?,?,?,?,?,?)";
  sql.query(
    sqlInsert,
    [
      staffFlat,
      staffName,
      staffGender,
      staffAge,
      staffPhone,
      staffProfession,
      staffStartTime,
      staffEndTime,
    ],
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(result);
      }
    }
  );
});

router.get("/getallstaff/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM staff WHERE (Flat_no = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/getstaff/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM staff WHERE (StaffID = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.delete("/delstaff/:id", (req, res) => {
  const sqlFetch = "SELECT imageUID FROM staff WHERE (StaffID = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      var filePathFam = `${__dirname}/../../../Facesafe-React/public/images/Staff/${result[0].imageUID}`;
      fs.unlinkSync(filePathFam);
      var filePathRecog = `${__dirname}/../../../Facesafe-Backend/faceimages/${result[0].imageUID}`;
      fs.unlinkSync(filePathRecog);
    }
  });

  const sqldel = "DELETE FROM staff WHERE (StaffID = ?)";
  sql.query(sqldel, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

//Image and data saving
const upload = multer();

router.post("/upload", upload.single("staffPhoto"), function (req, res) {
  console.log(req.body);
  const staffFlat = req.body.staffFlat;
  const staffName = req.body.staffName;
  const staffGender = req.body.staffGender;
  const staffAge = req.body.staffAge;
  const staffPhone = req.body.staffPhone;
  const staffProfession = req.body.staffProfession;
  const staffStartTime = req.body.staffStartTime;
  const staffEndTime = req.body.staffEndTime;
  const file = req.file;

  if (!file.detectedFileExtension.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    res.send(new Error("Invalid File Type"));
  } else {
    var datetime = new Date();
    const imgUID =
      "S" + staffName + datetime.getTime() + file.detectedFileExtension;
    const imgaddr = "/images/Staff/" + imgUID;

    var writestream = fs.createWriteStream(
      `${__dirname}/../../../Facesafe-React/public/images/Staff/${imgUID}`
    );
    file.stream.pipe(writestream);

    var writestream = fs.createWriteStream(
      `${__dirname}/../../../Facesafe-Backend/faceimages/${imgUID}`
    );
    file.stream.pipe(writestream);

    const sqlInsert =
      "INSERT INTO staff (Flat_no, Name, Gender, Age, Phone_no, Profession, Working_hours_from, Working_hours_to, Photo_staff, imageUID) VALUES (?,?,?,?,?,?,?,?,?,?)";
    sql.query(
      sqlInsert,
      [
        staffFlat,
        staffName,
        staffGender,
        staffAge,
        staffPhone,
        staffProfession,
        staffStartTime,
        staffEndTime,
        imgaddr,
        imgUID,
      ],
      (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
        }
      }
    );

    res.send("Done");
  }
});

module.exports = router;
