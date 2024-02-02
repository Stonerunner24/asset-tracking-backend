module.exports = (sequelize, Sequelize) => {
    const Permission = sequelize.define("permission", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      
    });
    return Permission;
  };
  