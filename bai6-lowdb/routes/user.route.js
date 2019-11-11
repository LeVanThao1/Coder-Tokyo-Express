const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidate = require('../validation/user.validate');

router.get('/', userController.index);

router.get('/search', userController.search);

router.get('/create', userController.create);
router.post('/create', userValidate.postCreate, userController.postCreate);

router.get('/:id', userController.getUser);

module.exports = router;