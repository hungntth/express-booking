const bcrypt = require('bcryptjs');
const moment = require('moment');

/**
 * Description: Hash password
 * Created by: LTNghia(13/05/2022)
 * @param {String} password 
 * @returns String - password hashed
 */
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);
    return passwordHashed;
}

/**
 * Description: Compare password
 * Created by: LTNghia(13/05/2022)
 * @param {String} password 
 * @param {String} passwordHashed 
 * @returns Boolean
 */
const comparePassword = (password, passwordHashed) => {
    return bcrypt.compareSync(password, passwordHashed)
}

/**
 * Description: Dunction audit
 * Created by: LTNghia(15/04/2022)
 * @param {Object} body 
 * @param {Object} req 
 * @param {Boolean} isUpdate 
 */
const audit = (body, req, isUpdate) => {
    if (!isUpdate) {
        body.created_time = now();
        body.created_by = req.user.username;
    } else {
        body.updated_time = now();
        body.updated_by = req.user.username;
    }
}

/**
 * Description: Log info
 * Created by: LTNghia(15/05/2022)
 * @param {String} address 
 * @param {String} error 
 * @param {Object} req 
 */
const logInfo = (address, error, req) => {
    console.log(`${address} Info: ${req ? req.currentTime : moment().toISOString()}|${error}`);
}

/**
 * Description: Log error
 * Created by: LTNghia(15/05/2022)
 * @param {String} address 
 * @param {String} error 
 * @param {Object} req 
 */
const logError = (address, error, req) => {
    console.error(`${address} Error: ${req ? req.currentTime : moment().toISOString()}|${error}`);
    if(error['stack']) {
        console.error(error['stack']);
    }
}

/**
 * Description: Log debug
 * Created by: LTNghia(15/05/2022)
 * @param {String} address 
 * @param {String} error 
 * @param {Object} req 
 */
const logDebug = (address, error, req) => {
    console.debug(`${address} Debug: ${req ? req.currentTime : moment().toISOString()}|${error}`);
}

/**
 * Description: Escape string
 * Created by: LTNghia(16/05/2022)
 * @param {String} str 
 * @returns String
 */
const escapeChar = (str) => {
    let newStr = JSON.parse(JSON.stringify(str));
    newStr = newStr.replace(/!/g, '!!');
    newStr = newStr.replace(/%/g, '!%');
    newStr = newStr.replace(/_/g, '!_');
    return newStr;
}

module.exports = {
    hashPassword,
    comparePassword,
    audit,
    logInfo,
    logDebug,
    logError,
    escapeChar
};