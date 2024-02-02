module.exports = (sequelize, Sequelize) => {
    const Building = sequelize.define("building", {
        id:{
            type: Sequelize.INT
        },
        buildingTag:{
            type: Sequelize.STRING(10)
        },
        buildingName:{
            type: Sequelize.STRING(50)
        },
        yearBuilt:{
            type : Sequelize.INT
        },
        sqFeet:{
            type: Sequelize.INT
        },
        numStories:{
            type: Sequelize.INT
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
            type: Sequelize.INT
        }
    });
    return Building;
};