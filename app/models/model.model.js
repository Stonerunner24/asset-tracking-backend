module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("model", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      model: {
        varchar: Sequelize.STRING,
        allowNull: false,
      },
      weightInPounds: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  
    return Model;
  };
  