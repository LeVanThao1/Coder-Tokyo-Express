const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidate = require('../validation/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.requireAuth, userController.index);

router.get('/search', authMiddleware.requireAuth, userController.search);

router.get('/create', authMiddleware.requireAuth, userController.create);
router.post('/create', [authMiddleware.requireAuth, userValidate.postCreate], userController.postCreate);

router.get('/:id', authMiddleware.requireAuth, userController.getUser);

module.exports = router;