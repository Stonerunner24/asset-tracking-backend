module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("type", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      typeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  
    return Type;
  };
  