module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      int: {
        type: Sequelize.DATE,
        primaryKey: true,
        autoIncrement: true,
      },
      catName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    });
  
    return Category;
  };