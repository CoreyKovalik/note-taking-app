const express = require('express');
const routes = express.Router();

const notes = require('./notes');

routes.use('/notes', notes);

module.exports = routes;