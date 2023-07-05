const express = require('express');

const UsersHandler = require('./handler');
const container = require('../../../../Infrastructures/container');

const router = express.Router();
const usersHandler = new UsersHandler(container);

router.get('/users', usersHandler.postUserPageHandler);
router.post('/users', usersHandler.postUserHandler);

module.exports = router;
