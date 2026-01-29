const express = require("express");
const router = express.Router();
const sql = require("../../sqlconn");

router.get("/getalllog/:id", (req, res) => {
  const sqlFetch = "SELECT * FROM logs WHERE (Flat_no = ?)";
  sql.query(sqlFetch, [parseInt(req.params.id)], (err, result) => {
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
