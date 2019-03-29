const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const routes = require('./routes');

// npm install --save body-parser // needed before any app.method
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);

app.use('/', (req, res, next) => res.sendStatus(404));

module.exports = app;