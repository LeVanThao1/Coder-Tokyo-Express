const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authValidation = require('../validation/auth.validate');

router.get('/auth/login', authController.login);

router.post('/auth/login', authValidation.postLogin, authController.checkLogin);

module.exports = router;