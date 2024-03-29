const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyAuth = (req, res, next) => {

    let token = req.header('auth-token');
    if (!token) {
        return res.send({validated:false});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.send({validated:false});
    }
}
module.exports = verifyAuth