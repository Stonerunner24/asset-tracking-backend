module.exports = (sequelize, Sequelize) => {
    const Repair = sequelize.define("repair", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      problems: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    return Repair;
  };