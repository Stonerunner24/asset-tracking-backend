require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

// ! CHANGE BEFORE FINAL SYSTEM
// db.sequelize.sync();
db.sequelize.sync({ alter: true });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/item.routes.js")(app);
require("./app/routes/type.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/building.routes.js")(app);
require("./app/routes/room.routes.js")(app);
require("./app/routes/field.routes.js")(app);
require("./app/routes/repair.routes.js")(app);
//require("./app/routes/user.routes")(app);
//require("./app/routes/tutorial.routes")(app);
//require("./app/routes/lesson.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3034;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
