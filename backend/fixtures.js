const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');
const Product = require('./models/Product');
const History = require('./models/History');
const Request = require('./models/Request');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

  const user =   await User.create({
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
    });

    await Product.create({
        name: 'Продукт-1',
        amount: '10 кг',
        price: '1000 coм',
        isRefrigeratorRequired: true
    },{
        name: 'Продукт-2',
        amount: '15 кг',
        price: '1001 coм'
    },{
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
    await Request.create(
        {user:user[0],
    products:[{
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
            comment:'bla bla bla'
        });

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});