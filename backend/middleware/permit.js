const permit = (permit) => (req, res, next) => {
    if(!req.currentUser) return res.status(401).send({error: 'User is unauthenticated'});

    if(!req.currentPermissions.includes(permit)) return res.status(403).send({error: 'User is unauthenticated'});

    next();
};

module.exports = permit;