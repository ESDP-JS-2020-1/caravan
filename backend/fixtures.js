const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: 'marketOne',
        password: '12345',
        token: '123',
        displayName: 'Some market',
        role: 'admin'
    });


    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});