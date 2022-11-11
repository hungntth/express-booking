const passport = require("passport");
const {common, constant} = require('../utils');
const { Unauthorized } = require("http-errors");

/**
 * Description: Verify json web token
 * Created by: LTNghia(16/05/2022)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const jwtAuth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info,) => {
        if (!user) {
            common.logError('[middlewares][jwtAuth]', Unauthorized());
            res.response(res, Unauthorized(), constant.httpStatus.badRequest, req.__())
        }
        if (error) {
            common.logError('[middlewares][jwtAuth]', error);
            res.response(res, error, constant.httpStatus.badRequest, req.__())
        }
        return next();
    })(req, res, next);
};

module.exports = jwtAuth;