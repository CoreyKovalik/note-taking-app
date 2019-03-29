'use strict';
const app = require('./app');
const port = 8080;
app.listen(port, () => console.log(`homework-sse: Express backend API listening on port ${port}!`));