const express = require('express');

const UserRouter = require('./users/user-router.js');

const server = express(); //this is an express server

server.use(express.json()); //expect json
server.use('/api', UserRouter)

module.exports = server;
