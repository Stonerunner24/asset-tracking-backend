const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.building = require("./building.model.js")(sequelize, Sequelize);
db.itemInformation = require("./itemInformation.model.js");
db.lesson = require("./lesson.model.js")(sequelize, Sequelize);
db.permission = require("./permission.model.js")(sequelize, Sequelize);
db.person = require("./person.model.js")(sequelize, Sequelize);
db.renovation = require("./renovation.model.js")(sequelize, Sequelize);
db.repair = require("./repair.model.js")(sequelize, Sequelize);
db.role = require("./room.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);




// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign key for room
db.building.hasMany(
  db.room, 
  { as: "room" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.room.belongsTo(
  db.building,
  {foreignKey: {allowNull: false}, onDelete: "CASCADE" }
);
  




//foreign key for renovations
db.building.hasMany(
  db.renovation,
  { foreignKey: "buildingId"}
);

db.renovation.belongsTo(
  db.building,
  
  { foreignKey: "buildingId"}
);

//item information foreign key

db.item.hasMany(
  db.itemInformation,
  { foreignKey: "itemId"}
);

db.itemInformation.belongsTo(
  db.item,
  { foreignKey: "itemId"}
);
// foreign key for Item
db.model.hasMany(
  db.item,
  { foreignKey: "modelId"}
);

db.item.belongsTo(
  db.model,
  { foreignKey: "modelId"}
);

//repair foreign keys

db.item.hasMany(
  db.repair,
  { foreignKey: "itemId"}
);

db.repair.belongsTo(
  db.item,
  { foreignKey: "itemId"}
);

db.person.hasMany(
  db.repair,
  { foreignKey: "ocEmployee" }
);

db.repair.belongsTo(
  db.person,
  { foreignKey: "ocEmployee" }
);

db.vendor.hasMany(
  db.repair,
  { foreignKey: "vendorId" }
);

db.repair.belongsto(
  db.vendor,
  { foreignKey: "vendorId" } 
);

//foreign key for permission
db.role.hasMany(
  db.permission, { foreignKey: "roleId" }
);

db.permission.belongsTo(
  db.role,
  { foreignKey: "roleId" }
);

//foreign key for user

db.role.hasMany(
  db.user, 
  {foreignKey: "roleId"}
  );

db.user.belongsTo(
  db.role,
  { foreignKey: "roleId" }
);

module.exports = db;
