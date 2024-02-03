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

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
db.lesson = require("./lesson.model.js")(sequelize, Sequelize);
// TODO: Make asset models
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

// TODO: Make asset foreign keys

// foreign key for type
db.category.hasMany(
  db.type,
  { foreignKey: 'categoryId' },
);
db.type.belongsTo(
  db.category,
  { foreignKey: 'categoryId' },
)

// foreign key for model
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

// foreign key for typeField
db.field.hasOne(
  db.typeField,
  { foreignKey: fieldId },
),
db.typeField.belongsTo(
  db.field,
  { foreignKey: fieldId },
)

db.type.hasOne(
  db.typeField,
  { foreignKey: typeId },
)
db.typeField.belongsTo(
  db.type,
  { foreignKey: typeId },
)

module.exports = db;
