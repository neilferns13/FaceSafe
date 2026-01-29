const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//router connection to master_permission table
app.use("/api/master", require("./routes/master_permission/permission"));
//router connection to family table
app.use("/api/family", require("./routes/family/fam"));
//router connection to log table
app.use("/api/log", require("./routes/log/syslog"));
//router connection to resident table
app.use("/api/resident", require("./routes/resident/residents"));
//router connection to staff table
app.use("/api/staff", require("./routes/staff/staffmem"));
//router connection to visitor table
app.use("/api/visitor", require("./routes/visitor/visitors"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started at port: ${PORT}`));
