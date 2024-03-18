module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productionYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      receivedDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      warrantyEnd: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      serialNum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      initialValue: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: true,
      },
      disposalValue: {
        type: Sequelize.DECIMAL(7,2),
        allowNull: true,
      },
      repairSchedule: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
    });
  
    return Item;
  };
  