const History = require('../models/History');

module.exports = function (schema) {

    let user, type;

    schema.pre('save', function (next, request) {
        if(typeof request === 'object') {
            user = request.currentUser;
            if(request.isRemoved) type = 'delete';
        }

        type = this.isNew ? 'add' : 'edit';

        next()
    })

    schema.post('save', async function (info) {
        await History.create({ user, info, type })
    })

}