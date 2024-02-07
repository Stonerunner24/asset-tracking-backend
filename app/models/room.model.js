module.exports = (sequelize, Sequelize) =>{
    const Room = sequelize.define("room", {
        id: {
            type: Sequelize.INTEGER,
        },
        roomNum : {
            type: Sequelize.STRING(15),
        }
    });
    return Room;
};
