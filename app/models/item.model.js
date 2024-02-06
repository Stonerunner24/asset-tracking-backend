module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productionYear: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      receivedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      warrantyEnd: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      serialNum: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Item;
  };
  