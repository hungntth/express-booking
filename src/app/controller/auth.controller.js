const passport = require("passport");
const jwt = require("jsonwebtoken");
const {common, constant, secrets} = require('../../utils');
const { Unauthorized } = require("http-errors");

/**
 * Description: Get address function
 * Created by: LTNghia(16/05/2022)
 * @param {String} functionName 
 * @returns 
 */
const getAddress = (functionName) => {
    return `[app][controller][auth][${functionName}]`;
}

/**
 * Description: Login request
 * Created by: LTNghia(15/05/2022)
 * @param {object} req  
 * @param {object} res
 * @param {function} next
 * @returns {undefined} 
 */
const login = async (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) {
            common.logError(getAddress('login'), error);
            res.response(res, error, constant.httpStatus.badRequest, req.__());
        }
        if (!user) {
            common.logError(getAddress('login'), Unauthorized());
            res.response(res, Unauthorized(), constant.httpStatus.badRequest, req.__());
        }
        req.login(user, (error) => {
            if (error) {
                common.logError(getAddress('login'), error);
                res.response(res, error, constant.httpStatus.badRequest, req.__());
            }
            const payload = { sub: user.id };
            const accessToken = jwt.sign(payload, secrets.JWT_SECRET, {
                expiresIn: secrets.JWT_MAX_AGE,
            });
            res.response(res, { user, accessToken }, constant.httpStatus.success, req.__(''));
        });
    })(req, res, next);
}

module.exports = {
    login
};