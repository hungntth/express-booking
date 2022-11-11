/**
 * Description: Response request
 * Created by: LTNghia(15/05/2022)
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const response = (req, res, next) => {
    res.response = (response, data, status, message) => {
        if (status) {
            response.status(status);
        }
        response.json({
            data: data,
            status: status,
            message: message
        });
    }

    next();
}

module.exports = response;