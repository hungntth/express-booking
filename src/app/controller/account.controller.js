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

const getAll = async (req, res, next) => {
    try {
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
    } catch (error) {
        res.response(res, null, constant.httpStatus.badRequest, req.__('system.error'));
    }
}


module.exports = {
    getAll
};