module.exports = (sequelize, Sequelize) =>{
    const Room = sequelize.define("room", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        roomNum : {
            type: Sequelize.STRING(15),
            allowNull: false,
        }
    });
    return Room;
};
