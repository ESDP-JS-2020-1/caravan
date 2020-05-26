const permit = permit => (req, res, next) => {
    if(!req.currentUser) return res.status(401).send({error: 'User is unauthenticated'});
    console.log(req.currentPermissions);
    if(!req.currentPermissions.includes(permit)) return res.status(403).send({error: `You dont have "${permit}" permission!`});

    next();
};

module.exports = permit;