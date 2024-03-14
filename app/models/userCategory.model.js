module.exports = (sequelize, Sequelize) => {
    const UserCategory = sequelize.define("userCategory", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
  
    return UserCategory;
  };
  