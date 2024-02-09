module.exports = (sequelize, Sequelize) => {
    const Assignment = sequelize.define("assignment", {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  
    return Assignment;
  };
  