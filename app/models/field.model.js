module.exports = (sequelize, Sequelize) => {
    const Field = sequelize.define("field", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Field;
  };
  