const {postgresql: db} = require('../../connections');
const {common, constant} = require('../../utils');
const accountRepo = require('../repositories/account.repository');

/**
 * Description: Get address function
 * Created by: LTNghia(16/05/2022)
 * @param {String} functionName 
 * @returns String
 */
const getAddress = (functionName) => {
    return `[app][controller][auth][${functionName}]`;
}

/**
 * Description: Get list record account
 * Created by: LTNghia(15/05/2022)
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const getAll = async (req, res, next) => {
    const searchObj = {
        username: req.params['username'],
        page: req.params['page'],
        size: req.params['size']
    }

    let count = await accountRepo.getAll(searchObj,true, true);
    res.setHeader(
        'X-Total-Count',
        count[0].count
    );

    let datas = await accountRepo.getAll(searchObj,false, false);

    res.response(res, datas, constant.httpStatus.success, req.__('system.success'));
}

/**
 * Description: Process get account by id
 * Created by: LTNghia(15/05/2022)
 * @param {Number} id 
 */
const processGetById = async (id) => {
    let status = true;
    let resultObj = {};
    let message = '';
    try {
        await db.db.Account.findOne({
            where: {
                id,
                is_active: true
            },
            raw: true,
        }).then(result => {
            if(!result) {
                status = false;
                message = '';
                return;
            }
            message = 'system.success';
            resultObj = result;
            return;
        }).catch(error => {
            common.logError(getAddress('processGetById'), error);
            status = false;
            resultObj = error;
            message = ''
        })
    } catch (error) {
        common.logError(getAddress('processGetById'), error);
        status = false;
        resultObj = error;
        message = ''
    }

    return {
        status,
        resultObj,
        message
    }
}

/**
 * Description: Get account by id
 * Created by: LTNghia(15/05/2022)
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const getById = async (req, res, next) => {
    const id = req.body.id;
    const getResult = await this.processGetById(id);
    let httpStatus = constant.httpStatus.success;
    if(!getResult.status) {
        httpStatus = constant.httpStatus.badRequest;
    }
    
    res.response(res, getResult.resultObj, httpStatus, req.__(getResult.message));
}

/**
 * Description: Process get account by id
 * Created by: LTNghia(15/05/2022)
 * @param {Number} id 
 */
const processGetByUsername = async (username) => {
    let status = true;
    let resultObj = {};
    let message = '';
    try {
        await db.db.Account.findOne({
            where: {
                username,
                is_active: true
            },
            raw: true,
        }).then(result => {
            if(!result) {
                status = false;
                message = '';
                return;
            }
            message = 'system.success';
            resultObj = result;
            return;
        }).catch(error => {
            common.logError(getAddress('processGetByUsername'), error);
            status = false;
            resultObj = error;
            message = ''
        })
    } catch (error) {
        common.logError(getAddress('processGetByUsername'), error);
        status = false;
        resultObj = error;
        message = ''
    }

    return {
        status,
        resultObj,
        message
    }
}

module.exports = {
    getAll,
    getById,
    processGetById,
    processGetByUsername
};