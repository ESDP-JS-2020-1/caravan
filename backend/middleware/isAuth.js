const User = require('../models/User');
const Group = require('../models/Group');

module.exports = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(404).send({error: 'Access denied'})
    } else {
        const [type, token] = authHeader.split(' ');
        const user = await User.findOne({token});
        if (type !== 'token' || !user) {
            return res.status(404).send({error: 'Access denied'})
        } else {
            if (user) {
                const groups = await Group.find({list: {$elemMatch: {user: user._id}}});
                let permissions = new Set();
                groups.forEach(elemt => elemt.permissions.forEach(permit => permissions.add(permit)));
                permissions = [...permissions];
                req.currentPermissions = permissions;
            }
            req.currentUser = user;
            return next();
        }
    }
};