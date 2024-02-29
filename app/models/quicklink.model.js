module.exports = (sequelize, Sequelize) => {
    const QuickLink = sequelize.define("quikLink", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        path:{
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return QuickLink;
};