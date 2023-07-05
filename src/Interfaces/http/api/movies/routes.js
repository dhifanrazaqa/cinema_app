const express = require('express');

const MoviesHandler = require('./handler');
const container = require('../../../../Infrastructures/container');

const router = express.Router();
const moviesHandler = new MoviesHandler(container);

router.get('', moviesHandler.getAllMovieHandler);
router.get('/:id/detail', moviesHandler.getDetailMovieHandler);

module.exports = router;
