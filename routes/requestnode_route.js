const express = require('express');
const requestnode_route = express.Router();

/* request node controller */
const { request_controller, getRequestInfo } = require('../controllers/requestnode_controller');
const { Auth } = require("../middleware/Authorization");

/* Put devname and nodename into the params */
requestnode_route.get('/request/:devname/:nodename', request_controller);


requestnode_route.post('/makerequest', Auth, getRequestInfo)

module.exports = {
    requestnode_route
}