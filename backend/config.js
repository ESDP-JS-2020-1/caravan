const path = require('path');
const rootPath = __dirname;

const env = process.env.NODE_ENV;

let database = 'mongodb://localhost/caravan';
let port = 8000;

if (env === 'test') {
    database = 'mongodb://localhost/caravan-test';
    port = 8010;
}

module.exports = {
    rootPath,
    userAvatar: path.join(rootPath, 'public/uploads/userAvatar'),
    database,
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    port,
};