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
      },      
      expectedEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
   });
  
    return Assignment;
  };
  