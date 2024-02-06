module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("type", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        name: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  
    return Type;
  };
  