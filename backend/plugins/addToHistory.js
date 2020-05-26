
module.exports = function (schema) {

    let user, type;

    schema.pre('save', function (next, request) {
        user = request.currentUser;

        type = this.isNew ? 'add' : 'edit'
        if(this.isRemoved) type = 'delete';

        next()
    })
}