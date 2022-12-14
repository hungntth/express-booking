module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("users");
    Account.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.STRING
        }, 
        city: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
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
    
    return Account;
};