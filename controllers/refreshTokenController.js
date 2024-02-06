// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const crud=require('../crud/crud.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    console.log("%c ♓: handleRefreshToken -> cookiesRefreshToken", "font-size:16px;background-color:#ce99f6;color:white;", cookies.jwt )
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    //const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
      crud.getUserToken(refreshToken)(async  (results) =>{
        console.log("ResultTokensssssss",results)  
        const foundUser=results?.[0]
        console.log("%c 💁‍♀️: handleRefreshToken -> !foundUser ", "font-size:16px;background-color:#e21c28;color:white;", foundUser?.id)
        if (!foundUser) return res.sendStatus(403); //Forbidden 
        // evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
            console.log("%c 🌪️: handleRefreshToken -> decoded ", "font-size:16px;background-color:#d598d3;color:white;", decoded)
                if (err || foundUser.emailAddress !== decoded.userEmail) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { "userEmail": decoded.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '30s' }
                );
                res.json({ id:foundUser?.id,accessToken, roles: foundUser.roles, pwd:foundUser.password,user:foundUser.username,userId:foundUser?.id});

            }
        );
       });
  
}

module.exports = { handleRefreshToken }