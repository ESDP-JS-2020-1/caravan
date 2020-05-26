const History = require('../models/History');

module.exports = function (schema) {

    let user, type;

    schema.pre('save', function (next, request) {
        user = request.currentUser;

        type = this.isNew ? 'add' : 'edit';
        if(request.isRemoved) type = 'delete';

        next()
    })

    schema.pre('save', async function (info) {
        await History.create({ user, info, type })
    })

}