const mongoose = require('mongoose');
const config = require("./config");

const User = require('./models/User');
const Product = require('./models/Product');
const Group = require('./models/Group');
const History = require('./models/History');
const Request = require('./models/Request');
const NominatedRequest = require('./models/NominatedRequest');

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
            coordinates: {lat: 49.554215, lng: 79.4555555}
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

    const [adminGroup, adminGroup2, adminGroup3, adminGroup4] = await Group.create({
        name: 'Admin group',
        list: [{user: user1}],
        permissions:
            [
                'addUser', 'deleteUser', 'editUser',
                'addProduct', 'deleteProduct', 'editProduct',
                'getGroup', 'addGroup', 'deleteGroup',
                'addRequest', 'deleteRequest', 'editRequest',
                'viewHistory', 'getUser', 'getRequest', 'closeRequest'
            ]
    }, {
        name: 'Courier group',
        list: [{user: user1}],
        permissions:
            [
                'getRequest'
            ]
    }, {
        name: 'Operator group',
        list: [{user: user2}],
        permissions:
            [
                ' getRequest', 'getUser', 'getGroup', 'viewHistory', 'addRequest', 'deleteRequest'
            ]
    }, {
        name: 'Market group',
        list: [{user: user3}],
        permissions:
            [
                ' getRequest', 'addRequest',
            ]
    });
    user1.group.push(adminGroup._id);
    user2.group.push(adminGroup._id);
    user3.group.push(adminGroup4._id);
    user4.group.push(adminGroup3._id);
    user1.save();
    user2.save();
    user3.save();
    user4.save();
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
        user: user1,
        products: [{
            product: product1,
            amount: '2',
        }],
        comment: 'bla bla bla'
    });

    await NominatedRequest.create({
        courier: user4,
        request: request,
        date: Date.now()
    });

    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});