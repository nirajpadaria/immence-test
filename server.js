require('./config/db')
const express = require('express');
const PORT = 3000;
const api = require('./api/index');
const app = express();

app.use(express.json());

app.use ('/users', api);

app.listen( PORT , () => {
    console.log(`server is running on ${PORT}`);
});