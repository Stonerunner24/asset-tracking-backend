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
db.itemInformation = require("./itemInformation.model.js")(sequelize, Sequelize);
db.permission = require("./permission.model.js")(sequelize, Sequelize);
db.person = require("./person.model.js")(sequelize, Sequelize);
db.renovation = require("./renovation.model.js")(sequelize, Sequelize);
db.repair = require("./repair.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.vendor = require("./vendor.model.js")(sequelize, Sequelize);
db.assignment = require("./assignment.model.js")(sequelize, Sequelize);
db.brand = require("./brand.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.field = require("./field.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);
db.itemField = require("./itemField.model.js")(sequelize, Sequelize);
db.model = require("./model.model.js")(sequelize, Sequelize);
db.modelField = require("./modelField.model.js")(sequelize, Sequelize);
db.type = require("./type.model.js")(sequelize, Sequelize);
db.typeField = require("./typeField.model.js")(sequelize, Sequelize);

// ~~ Foreign Keys ~~

// foreign key for session
db.user.hasMany(
  db.session,
  { foreignKey: "userId" }
);
db.session.belongsTo(
  db.user,
  { foreignKey: "userId" }
);

//foreign key for room
db.building.hasMany(
  db.room, 
  { foreignKey: "buildingId" }
);

db.room.belongsTo(
  db.building,
  {foreignKey: "buildingId" }
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

db.repair.belongsTo(
  db.vendor,
  { foreignKey: "vendorId" } 
);

//foreign key for permission
db.role.hasMany(
  db.permission, 
  { foreignKey: "roleId"}
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

db.person.hasOne(
  db.user,
  { foreignKey: "personId" }
)
db.user.belongsTo(
  db.person,
  { foreignKey: "personId" },
)


// foreign key for type
db.category.hasMany(
  db.type,
  { foreignKey: 'categoryId' },
);
db.type.belongsTo(
  db.category,
  { foreignKey: 'categoryId' },
)

// foreign keys for model
db.type.hasMany(
  db.model,
  { foreignKey: 'typeId' },
)
db.model.belongsTo(
  db.type,
  { foreignKey: 'typeId' },
)

db.brand.hasOne(
  db.model,
  { foreignKey: 'brandId' },
)
db.model.belongsTo(
  db.brand,
  { foreignKey: 'brandId' },
)

// foreign keys for typeField
db.field.hasOne(
  db.typeField,
  { foreignKey: 'fieldId' },
),
db.typeField.belongsTo(
  db.field,
  { foreignKey: 'fieldId' },
)

db.type.hasOne(
  db.typeField,
  { foreignKey: 'typeId' },
)
db.typeField.belongsTo(
  db.type,
  { foreignKey: 'typeId' },
)

// foreign keys for modelField
db.model.hasOne(
  db.modelField,
  { foreignKey: 'modelId' },
)
db.modelField.belongsTo(
  db.modelField,
  { foreignKey: 'modelId' },
)

db.field.hasOne(
  db.modelField,
  { foreignKey: 'fieldId' },
)
db.modelField.belongsTo(
  db.field,
  { foreignKey: 'fieldId' },
)

// foreign keys for itemField
db.item.hasOne(
  db.itemField,
  { foreignKey: 'itemId' },
)
db.itemField.belongsTo(
  db.item,
  { foreignKey: 'itemId' },
)

db.field.hasOne(
  db.itemField,
  { foreignKey: 'fieldId' },
)
db.itemField.belongsTo(
  db.field,
  { foreignKey: 'fieldId' },
)

// foreign keys for item
db.model.hasMany(
  db.item,
  { foreignKey: 'modelId' },
)
db.item.belongsTo(
  db.model,
  { foreignKey: 'modelId' },
)

// foreign keys for assignment
db.item.hasMany(
  db.assignment,
  { foreignKey: 'itemId' },
)
db.assignment.belongsTo(
  db.item,
  { foreignKey: 'itemId' },
)

db.person.hasMany(
  db.assignment,
  { foreignKey: 'personId' },
)
db.assignment.belongsTo(
  db.person,
  { foreignKey: 'personId' },
)

db.building.hasMany(
  db.assignment,
  { foreignKey: 'buildingId' },
)
db.assignment.belongsTo(
  db.assignment,
  { foreignKey: 'buildingId' },
)

db.room.hasMany(
  db.assignment,
  { foreignKey: 'roomId' },
)
db.assignment.belongsTo(
  db.room,
  { foreignKey: 'roomId' },
)

module.exports = db;
