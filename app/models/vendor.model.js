module.exports = (sequelize, Sequelize) => {
    const Vendor = sequelize.define("vendor", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Vendor;
  };