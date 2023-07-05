const express = require('express');

const AuthenticationsHandler = require('./handler');
const container = require('../../../../Infrastructures/container');

const router = express.Router();
const authenticationsHandler = new AuthenticationsHandler(container);

router.get('/users/authentications', authenticationsHandler.postAuthenticationPageHandler);
router.post('/users/authentications', authenticationsHandler.postAuthenticationHandler);
router.post('/users/logout', authenticationsHandler.deleteAuthenticationHandler);

module.exports = router;
