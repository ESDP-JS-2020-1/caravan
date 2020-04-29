const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');
const History = require('./models/History');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await User.create({
        username: '123',
        password: '12345',
        token: '123',
        displayName: 'Some market',
        role: 'admin',
        phone: '123'
    }, {
        username: 'userOne',
        password: '12345',
        token: '1234',
        displayName: 'Гриша',
        role: 'admin',
        phone: '123'
    }, {
        username: 'userTwo',
        password: '12345',
        token: '12345',
        displayName: 'Игнат',
        role: 'market',
        companyName: 'some market',
        address: 'adress',
        phone: '123'
    });

    await History.create({
        title: 'Гриша удалил пользователя Jack',
        comment: 'I dont know',
        type: 'delete'
    }, {
        title: 'Гриша добавил пользователя Jack',
        comment: 'No comment',
        type: 'add'
    }, {
        title: 'Гриша редактировал пользователя Jack',
        comment: 'Change his name',
        type: 'edit'
    });

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});