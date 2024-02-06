module.exports = (sequelize, Sequelize) => {
    const Renovation = sequelize.define("renovation", {
        id:{
            type: Sequelize.INT
        },
        date: {
            type: Sequelize.date
        },
        cost: {
            type: Sequelize.INT
        },
        description:{
            type: Sequelize.STRING
        }

    });
    return Renovation;
};
