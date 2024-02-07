module.exports = (sequelize, Sequelize) => {
    const Building = sequelize.define("building", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        buildingTag:{
            type: Sequelize.STRING(10),
            allowNull: false
        },
        buildingName:{
            type: Sequelize.STRING(50),
            allowNull: false
        },
        yearBuilt:{
            type : Sequelize.INTEGER,
            allowNull: false
        },
        sqFeet:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        numStories:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        hasElevator:{
            type: Sequelize.BOOLEAN
        },
        hasFireMonitor:{
            type: Sequelize.BOOLEAN
        },
        hasFireAlarm:{
            type: Sequelize.BOOLEAN
        },
        fireSmokeNotes:{
            type: Sequelize.STRING
        },
        construction:{
            type: Sequelize.STRING
        },
        value:{
            type: Sequelize.INTEGER
        }
    });
    return Building;
};