require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`)
});