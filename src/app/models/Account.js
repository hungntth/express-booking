module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account");
    Account.init({
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },  
        password: {
            type: Sequelize.STRING
        },
        is_active: {
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