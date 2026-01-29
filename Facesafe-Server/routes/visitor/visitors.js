const express = require("express");
const router = express.Router();
const sql = require("../../sqlconn");

router.get("/getallvisitor/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM visitor WHERE (Flat_no = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/getvisitor/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM visitor WHERE (VisitorID = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
