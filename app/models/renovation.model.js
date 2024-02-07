module.exports = (sequelize, Sequelize) => {
    const Renovation = sequelize.define("renovation", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: Sequelize.date,
            allowNull: false,
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,
        }

    });
    return Renovation;
};
