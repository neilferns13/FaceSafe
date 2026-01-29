const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "facesafe2021",
  database: "FaceSafe",
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
