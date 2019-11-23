const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transfer.controller');

router.get('/create', transferController.index);
router.post('/create', transferController.postTransfer);

module.exports = router