const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');
const Product = require('./models/Product');
const History = require('./models/History');
const Request = require('./models/Request');
const NominatedRequest = require('./models/NominatedRequest');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const user = await User.create({
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
        displayName: 'Степан Бендера',
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
        phone: '123',
        coordinates: {lat: 49.554215, lng: 79.4555555}
    }, {
        username: 'Courier1337',
        password: '123',
        token: '12345',
        displayName: 'Ашот из Ингушетии',
        role: 'courier',
        phone: '05504342257',
        carName: 'Уазик',
        carVolume: '3m³',
        carRefrigerator: true,
    });

    const [product1, product2, product3] = await Product.create({
        name: 'Продукт-1',
        amount: '10 кг',
        price: '1000 coм',
        isRefrigeratorRequired: true
    }, {
        name: 'Продукт-2',
        amount: '15 кг',
        price: '1001 coм'
    }, {
        name: 'Продукт-3',
        amount: '20 кг',
        price: '500 coм'
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

    const request = await Request.create({
        user: user[0],
        products: [{
            product: product1,
            amount: '2',
        }, {
            product: product2,
            amount: '3'
        }, {
            product: product3,
            amount: '4'
        }],
        comment: 'bla bla bla'
    }, {
        user: user[0],
        products: [{
            name: 'Продукт-1',
            amount: '2',
            isRefrigeratorRequired: false

        }, {
            name: 'Продукт-2',
            amount: '3',
            isRefrigeratorRequired: false
        }, {
            name: 'Продукт-3',
            amount: '4',
            isRefrigeratorRequired: false

        }],
        comment: 'bla bla bla'
    });

    await NominatedRequest.create({
        courier: user[3],
        request: request[1],
        date: Date.now()
    });

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});