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

// ======================================================================
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

// foreign key for tutorials
db.user.hasMany(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.tutorial.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for lessons
db.tutorial.hasMany(
  db.lesson,
  { as: "lesson" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.lesson.belongsTo(
  db.tutorial,
  { as: "tutorial" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// ================================================================

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
