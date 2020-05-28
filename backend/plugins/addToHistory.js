const History = require('../models/History');
const pluralize = require('pluralize')

module.exports = function (schema, { schemaName }) {

    const schemaNameInPlural = pluralize(schemaName).toLowerCase();

    let user, type;

    schema.pre('save', function (next, request) {
        type = this.isNew ? 'add' : 'edit';

        if(Object.keys(request).length !== 0) {
            user = request.currentUser;
            if(this.isRemoved) type = 'delete';
        }

        next()
    })

    schema.post('save', async function (info) {
        await History.create({ user, info: { data: info, schemaNameInPlural }, type })
    })

}