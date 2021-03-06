const mongoose = require('mongoose');
const config = require("./config");

const permissionsList = require('./permissions');

const User = require('./models/User');
const Product = require('./models/Product');
const Group = require('./models/Group');
const Request = require('./models/Request');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2, user3, user4] = await User.create({
        username: '123',
        password: '12345',
        token: '123',
        displayName: 'Some market',
        role: 'admin',
        phone: '123',
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
        phone: '05504342257',
        market: {
            address: 'adress',
            companyName: '123',
            coordinates:{lat: 49.554215, lng: 79.4555555}
        }
    }, {
        username: 'Courier1337',
        password: '123',
        token: '12345',
        displayName: 'Ашот из Ингушетии',
        role: 'courier',
        phone: '05504342257',
        courier: {
            carName: 'Уазик',
            carVolume: '3m³',
            carRefrigerator: true,
        }
    });

    await Group.create({
        name: 'Admin group',
        list: [{user: user1}],
        permissions: Object.values(permissionsList)
    }, {
        name: 'Courier group',
        list: [{user: user1}, {user: user4}],
        permissions:
            [
                permissionsList.VIEW_COURIER_LOCATION
            ]
    }, {
        name: 'Operator group',
        list: [{user: user2}],
        permissions:
            [
                permissionsList.GET_REQUEST, permissionsList.GET_USER,
                permissionsList.GET_GROUP, permissionsList.VIEW_HISTORY,
                permissionsList.ADD_REQUEST, permissionsList.DELETE_REQUEST
            ]
    }, {
        name: 'Market group',
        list: [{user: user3}],
        permissions:
            [
                permissionsList.GET_REQUEST,
                permissionsList.ADD_REQUEST,
            ]
    });

    const [product1] = await Product.create({
        name: 'Продукт-1',
        amount: '10',
        price: 1000,
        isRefrigeratorRequired: true,
        productType: 'кг'
    }, {
        name: 'Продукт-2',
        amount: '15',
        price: 1001,
        productType: 'кг'
    }, {
        name: 'Продукт-3',
        amount: '20',
        price: 500,
        productType: 'кг'
    });

    await Request.create({
        user: user1,
        products: [{
            product: product1,
            amount: '2',
        }]
    });

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});