const History = require('../models/History');

module.exports = function (schema) {

    let user, type;

    schema.pre('save', function (next, request) {
        type = this.isNew ? 'add' : 'edit';

        if(Object.keys(request).length !== 0) {
            user = request.currentUser;
            if(this.isRemoved) type = 'delete';
        } else {
            throw new Error('You must add request to "save"!')
        }

        next()
    })

    schema.post('save', async function (info) {
        await History.create({ user, info, type })
    })

}