require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_MAX_AGE = Number(process.env.JWT_MAX_AGE || "86400");
const PORT = process.env.PORT;

module.exports = {
    NODE_ENV,
    JWT_SECRET,
    JWT_MAX_AGE,
    PORT
}