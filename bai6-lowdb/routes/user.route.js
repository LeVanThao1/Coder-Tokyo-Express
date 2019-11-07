const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

const db = require('../db');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.create);
router.post('/create', userController.postCreate);

router.get('/:id', userController.getUser);

module.exports = router;