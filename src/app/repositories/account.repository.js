const {postgresql: db} = require('../../connections');
const {common} = require('../../utils');

/**
 * Description: get all record account
 * Created by: LTNghia(15/05/2022)
 * @param {Object} searchObj 
 * @param {Boolean} isCount 
 * @param {Boolean} getAll 
 */
const getAll = async (searchObj, isCount, getAll) => {
    let sql = `select id, 
                    username, 
                    is_active, 
                    created_by, 
                    created_at, 
                    updated_by, 
                    updated_at 
                from account 
                where is_active = true`

    if(searchObj.username) {
        const newUsername = common.escapeChar(searchObj.username)
        sql += ` and (lower(username) like lower('%${newUsername}%') escape '!')`;
    }

    // paging
    if (!searchObj.size) {
        searchObj.size = 20;
    }
    if (!searchObj.page) {
        searchObj.page = 1;
    }

    if (!getAll) {
        if (!isCount) {
            sql += ` limit ${searchObj.size} offset ${(searchObj.page - 1) * searchObj.size}`;
        } else {
            sql = `select count(*)
                from (${sql}) a`
        }
    } else {
        if (isCount) {
            sql = `select count(*)
                from (${sql}) a`
        }
    }

    return await db.db.sequelize.query(sql, {
        type: db.db.sequelize.QueryTypes.SELECT
    });
}

module.exports = {
    getAll
};