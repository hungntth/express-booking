const express = require('express');
const router = express.Router();

const {authController} = require('../../app/controller');

/**
 * Description: Api login
 * Created by: LTNghia(15/05/2022)
 */
router.post('/login', authController.login);

module.exports = router;