module.exports = (sequelize, Sequelize) => {
    const RoomNumbers = sequelize.define("roomNumbers");
    RoomNumbers.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roomNumber: {
            type: Sequelize.INTEGER
        },
        unavailableDates:{
            type: Sequelize.DATE
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
    
    return RoomNumbers;
};