module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
        fName: {
            Type: Sequelize.STRING(32),
            allowNull: false
        },
        lName:{
            Type: Sequelize.STRING(32),
            allowNull: false
        },
        email:{
            type: Sequelize.STRING(64),
            allowNull: false
        },
        campusId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }

    });
    return Person;
};