const express = require('express');

const MoviesHandler = require('./handler');
const container = require('../../../../Infrastructures/container');

const router = express.Router();
const moviesHandler = new MoviesHandler(container);

router.get('/balances', moviesHandler.getBalanceHandler);
router.post('/balances', moviesHandler.updateBalanceHandler);

module.exports = router;
