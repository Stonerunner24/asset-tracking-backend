module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
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
            primaryKey: true,
            autoIncrement: false,
        }

    });
    return Person;
};