module.exports = (sequelize, Sequelize) => {
    const Item_Information = sequelize.define("item_information", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      information: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
    return Item_Information;
  };