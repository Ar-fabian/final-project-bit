require('dotenv').config();
const myServer = require('./models/server');

const server = new myServer();

server.listening();


