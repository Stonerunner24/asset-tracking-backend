module.exports = (sequelize, Sequelize) =>{
    const Room = sequelize.define("room", {
        id: {
            type: Sequelize.INT,
        },
        roomNum : {
            type: Sequelize.STRING(15),
        }
    });
    return Room;
};
