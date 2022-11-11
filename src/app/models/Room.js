module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room");
    Room.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        maxPeople: {
            type: Sequelize.INTEGER
        },
        desc: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        created_by: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        },
        updated_by: {
            type: Sequelize.STRING
        }
    }, { sequelize, freezeTableName: true});
    
    return Room;
};