module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel");
    Hotel.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        distance: {
            type: Sequelize.STRING
        },
        photos: {
            type: Sequelize.STRING
        },
        title : {
            type: Sequelize.STRING
        },
        rating : {
            type: Sequelize.STRING
        },
        rooms : {
            type: Sequelize.STRING
        },
        cheapestPrice : {
            type: Sequelize.INTEGER
        },
        featured : {
            type: Sequelize.BOOLEAN
        },
        desc : {
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
    
    return Hotel;
};