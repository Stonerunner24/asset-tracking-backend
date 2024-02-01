module.exports = (sequelize, Sequelize) => {
    const ModelField = sequelize.define("modelField", {
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return ModelField;
  };
  