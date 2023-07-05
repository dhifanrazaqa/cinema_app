const express = require('express');

const SeatsHandler = require('./handler');
const container = require('../../../../Infrastructures/container');

const router = express.Router();
const seatsHandler = new SeatsHandler(container);

router.get('/:id/detail/:showtime', seatsHandler.getSeatHandler);

module.exports = router;
