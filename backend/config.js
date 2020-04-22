const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    userAvatar: path.join(rootPath, 'public/uploads/userAvatar'),
    database: 'mongodb://localhost/caravan',
    databaseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    port: 8000,
};