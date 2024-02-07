module.exports = (sequelize, Sequelize) => {
    const Assignment = sequelize.define("assignment", {
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
  