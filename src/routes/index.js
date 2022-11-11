const cors = require("cors");
const express = require('express');
const {secrets} = require('../utils');
const {postgresql: configDB} = require('../config');
const {response} = require('../middlewares');

const router = express.Router();

// Log info db
console.log(configDB[secrets.NODE_ENV]);

const api = require('./api');
const auth = require('./auth');

// use response
router.use(response);

// router
router.use('/api', cors(), api);
router.use('/auth', auth);

module.exports = router;
