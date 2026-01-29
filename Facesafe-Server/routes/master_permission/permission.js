const express = require("express");
const router = express.Router();
const sql = require("../../sqlconn");

//Permission Table calls
router.get("/", (req, res) => {
  const sqlSelect = "SELECT * FROM master_permission";
  sql.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

router.get("/:id", (req, res) => {});

module.exports = router;
