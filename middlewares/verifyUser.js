const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "helloworld";
const verifyUser = (req, res, next) => {
    // get the user from the jwt token and add id to req
    const token = req.headers.authorization.split(" ")[1]; // this is authToken
    if (!token) {
        return res.status(401).send({error: "Please authenticate using valid token => " + token});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data;
        next();
    } catch (e) {
        return res.status(401).send({error: "Please authenticate using valid token " + e});
    }
};

module.exports = verifyUser;