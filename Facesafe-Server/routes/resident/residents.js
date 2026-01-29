const express = require("express");
const router = express.Router();
const sql = require("../../sqlconn");

router.get("/getresident/:id", (req, res) => {
  const sqlFetch =
    "SELECT Name, Gender, Age, Phone_no, Flat_no, Imageaddress FROM resident WHERE (Flat_no = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/getFlat/:id", (req, res) => {
  const sqlFetch = "SELECT Flat_no FROM resident WHERE (Email_ID = ?)";
  sql.query(sqlFetch, [req.params.id], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/getPass/:id", (req, res) => {
  const sqlFetch = "SELECT Master_pass FROM resident WHERE (Flat_no = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.put("/updatePass", (req, res) => {
  const Flat = req.body.Flat_no;
  const pass = req.body.Pass;

  const sqlUpdate = "UPDATE resident SET Master_pass = ? WHERE Flat_no = ?";

  sql.query(sqlUpdate, [pass, parseInt(Flat)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

//Permission Table calls

router.get("/:id", (req, res) => {});

module.exports = router;
