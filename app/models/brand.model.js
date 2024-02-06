module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brand", {
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
  
    return Brand;
  };
  