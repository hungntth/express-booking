const config = require('../config');
const Pool = require('pg').Pool;
const {secrets} = require('../utils');

const models = require("../app/models");

const NODE_ENV = secrets.NODE_ENV;
const configDB = config.postgresql[NODE_ENV]

const pool = new Pool({
    user: configDB.username,
    host: configDB.host,
    database: configDB.dbName,
    password: configDB.password,
    port: 5432
})

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    configDB.dbName,
    configDB.username,
    configDB.password,
    {
        host: configDB.host,
        dialect: 'postgres',
        pool: {
            min: 0,
            max: 5,
            idle: 10000
        },
        define: {
            charset: 'utf8',
            timestamps: false
        },
        benchmark: false,
        logging: console.log
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.Account = models.Account(sequelize, Sequelize);

/**
 * Description: Get next sequence id
 * Created by: LTNghia(15/05/2022)
 * @param {String} sequenceName 
 * @returns 
 */
async function getNextSequence(sequenceName) {
    let seq = await db.sequelize.query(`SELECT nextval('${sequenceName}')`, {
        type: db.sequelize.QueryTypes.SELECT
    });
    return seq[0].nextval;
}

module.exports = {
    pool,
    db,
    getNextSequence
};
