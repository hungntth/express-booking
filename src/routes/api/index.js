const express = require('express');
const router = express.Router();

const {jwtAuth} = require('../../middlewares');

const account = require('./account');

// Router
router.all('*', jwtAuth);
router.use('/account', account);

module.exports = router;