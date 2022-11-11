const express = require('express');
const router = express.Router();

const {accountController} = require('../../app/controller');

/**
 * Description: Get list account
 * Created by: LTNghia(15/05/2022)
 */
router.get('/', accountController.getAll);

module.exports = router;