const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const user = require('./app/user');
const products = require('./app/products');
const histories = require('./app/histories');
const requests = require('./app/requests');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/users', user);
    app.use('/products', products);
    app.use('/histories', histories);
    app.use('/requests', requests);

    app.listen(config.port)
};

run().catch(e => {
    console.error(e)
});