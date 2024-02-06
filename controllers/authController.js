const crud = require("../crud/crud.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  crud.getUserByEmail(email)(async (results) => {
    const foundUser = results?.[0];
    console.log("FoundUser",foundUser);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      // create JWTs
      const accessToken = jwt.sign(
        { userEmail: foundUser.emailAddress},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        {  userEmail: foundUser.emailAddress},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      // Saving refreshToken with current user

      crud.assignUserToken(
        refreshToken,
        foundUser?.id
      )(async (results) => {
        return results;
      });
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ id:foundUser?.id,accessToken, roles: foundUser.roles, pwd:foundUser.password,user:foundUser.username,userId:foundUser?.id});
    } else {
      res.sendStatus(401);
    }
  });
};

module.exports = { handleLogin };
