module.exports = (sequelize, Sequelize) => {
    const Repair = sequelize.define("repair", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.date,
        allowNull: false,
      },
      problems: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    return Repair;
  };