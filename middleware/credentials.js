const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
   
    if (allowedOrigins.includes(origin)) {
        console.log("%c 🤖: credential-> originssss ", "font-size:16px;background-color:#b1b00b;color:white;", origin )
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials