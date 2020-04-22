const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const port = 8000;

const user = require('./app/user');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/user', user);

    app.listen(port)
};

run().catch(e => {
    console.error(e)
});