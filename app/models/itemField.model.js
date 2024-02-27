module.exports = (sequelize, Sequelize) => {
    const ItemField = sequelize.define("itemField", {
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return ItemField;
  };
