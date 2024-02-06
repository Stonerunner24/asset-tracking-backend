module.exports = (sequelize, Sequelize) => {
    const TypeField = sequelize.define("typeField", {
      isItem: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  
    return TypeField;
  };
