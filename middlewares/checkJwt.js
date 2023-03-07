const jwt = require('jsonwebtoken');

const checkJwt = function (req, res, next) {
    try {
        const token = req.headers['authorization'];
        const payload = jwt.verify(token, process.env.SECRET, {algorithms:['HS256']})

        if(!payload.user) {
            return res.status(401).send("Not authorized")
        }

        req.payload = payload.user;
        next()
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = checkJwt;