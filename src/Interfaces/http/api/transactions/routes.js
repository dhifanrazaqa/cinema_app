const express = require('express');

const TransactionsHandler = require('./handler');
const container = require('../../../../Infrastructures/container');

const router = express.Router();
const transactionsHandler = new TransactionsHandler(container);

router.post('/:id/detail/:showtime/payment', transactionsHandler.getTransactionPageHandler);
router.post('/:id/detail/:showtime/proccess', transactionsHandler.postTransactionHandler);
router.get('/transactions', transactionsHandler.getAllTransactionHandler);
router.post('/transactions/refund', transactionsHandler.postRefundTransactionHandler);

module.exports = router;
