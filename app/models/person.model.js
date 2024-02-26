module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
        },
        fName: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        lName:{
            type: Sequelize.STRING(32),
            allowNull: false
        },
        email:{
            type: Sequelize.STRING(64),
            allowNull: false
        },
        campusId:{
            type: Sequelize.INTEGER,
            allowNull: true
        },

    });
    return Person;
};