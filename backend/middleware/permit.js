const permit = (...roles) => (req, res, next) => {
    if(!req.currentUser) return res.status(401).send({error: 'User is unauthenticated'});

    if(!roles.includes(req.currentUser.role)) return res.status(403).send({error: 'User is unauthenticated'});

    next();
};

module.exports = permit;