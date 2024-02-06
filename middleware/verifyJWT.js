const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    console.log("%c 🥋: verifyJWT -> req ", "font-size:16px;background-color:#ec0269;color:white;", req)
    const authHeader = req.headers['authorization'];
    console.log("%c 💮: verifyJWT -> authHeader ", "font-size:16px;background-color:#bd0ca0;color:white;", authHeader)
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    );
}

module.exports = verifyJWT