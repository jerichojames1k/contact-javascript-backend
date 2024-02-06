// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const fsPromises = require("fs").promises;
const path = require("path");
const crud = require("../crud/crud.js");
const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  console.log(
    "%c 🇵🇭: handleLogout -> !cookies?.jwt ",
    "font-size:16px;background-color:#af5a5b;color:white;",
    cookies?.jwt
  );

  if (!cookies?.jwt) return res.sendStatus(401); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  //  const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
  crud.getUserToken(refreshToken)(async (results) => {
    const foundUser = results?.[0];
    console.log(
      "%c 🙁: handleLogout -> foundUser ",
      "font-size:16px;background-color:#fe2391;color:white;",
      foundUser
    );
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.sendStatus(204);
    }

    // Delete refreshToken in db

    crud.assignUserToken(
      "",
      foundUser?.id
    )(async (results) => {
      return results;
    });

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.sendStatus(204);
  });
};

module.exports = { handleLogout };
