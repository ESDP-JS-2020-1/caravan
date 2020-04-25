const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const user = require('./app/user');
const products = require('./app/products');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    app.use('/users', user);
    app.use('/products', products);

    app.listen(() => console.log(`Server start on ${config.port} port!`))
};

run().catch(e => {
    console.error(e)
});