var db = require("../middleware/db.js");

create = (newUser) =>
  async function (callback) {
    let sql = `INSERT INTO userdata(username,emailAddress,password,roles,refreshToken) VALUES ('${newUser.username}','${newUser.emailAddress}','${newUser.password}','${newUser.roles}', '${newUser.refreshToken}')`;
    const datas = await db.query(sql, (err, result) => {
      if (err) throw err;
      const data = JSON.stringify(result);
      return callback(JSON.parse(data));
    });
    return datas;
  };

getUserToken = (token) =>
  async function (callback) {
    db.query(
      `SELECT * FROM userdata where refreshToken ='${token}'`,
      function (err, results, fields) {
        if (err) throw err;
        const data = JSON.stringify(results);
        return callback(JSON.parse(data));
      }
    );
  };

getUserByEmail = (email) =>
  async function (callback) {
    db.query(
      `SELECT * FROM userdata where emailAddress ='${email}'`,
      function (err, results, fields) {
        if (err) throw err;
        const data = JSON.stringify(results);
        return callback(JSON.parse(data));
      }
    );
  };

checkEmailExistInContacts = (email) =>
  async function (callback) {
    db.query(
      `SELECT * FROM contacts where email ='${email}'`,
      function (err, results, fields) {
        if (err) throw err;
        const data = JSON.stringify(results);
        return callback(JSON.parse(data));
      }
    );
  };

assignUserToken = (token, id) => async (callback) => {
  db.query(
    "UPDATE userdata SET refreshToken = ? WHERE id = ?",
    [token, id],
    function (err, results, fields) {
      if (err) throw err;
      const data = JSON.stringify(results);
      return callback(JSON.parse(data));
    }
  );
};

//Delete Contacts
deleteContact = (contact) =>
  async function (callback) {
    const { id } = contact ?? {};
    db.query(
      "DELETE FROM contacts WHERE id= ?",
      [id],
      function (err, results) {
        if (err) throw err;
        const data = JSON.stringify(results);
        return callback(JSON.parse(data));
      }
    );
  };
//Edit Contacts
editContact = (contact) =>
  async function (callback) {
    const { id, name, phone, email, company } = contact ?? {};
    db.query(
      "UPDATE contacts SET name = ?,company = ?,phone = ?,email = ? WHERE id = ?",
      [name, company, phone, email, id],
      function (err, results) {
        if (err) throw err;
        const data = JSON.stringify(results);
        return callback(JSON.parse(data));
      }
    );
  };
//Add Contacts
addContact = (newUser) =>
  async function (callback) {
    let sql = `INSERT INTO contacts(userId,name,company,phone,email) VALUES ('${newUser.userId}','${newUser.name}','${newUser.company}','${newUser.phone}','${newUser.email}')`;
    const datas = await db.query(sql, (err, result) => {
      if (err) throw err;
      const data = JSON.stringify(result);
      return callback(JSON.parse(data));
    });
    return datas;
  };

getAllContactsAddByUser = (userId) =>
  async function (callback) {
    db.query(`SELECT * FROM contacts WHERE userId = '${userId}'`, function (err, results) {
      if (err) throw err;
      const data = JSON.stringify(results);
      return callback(JSON.parse(data));
    });
  };

  getSearchContacts = (searchTerm,userId) =>
  async function (callback) {
    db.query(
      `
      SELECT *
      FROM contacts
      WHERE
        (name LIKE '%${searchTerm}%' OR
        company LIKE '%${searchTerm}%' OR
        phone LIKE '%${searchTerm}%' OR
        email LIKE '%${searchTerm}%') AND userId= '${userId}';
    `,
      function (err, results, fields) {
        if (err) throw err;
        const data = JSON.stringify(results);
        return callback(JSON.parse(data));
      }
    );
  };

module.exports = {
  create,
  getUserByEmail,
  assignUserToken,
  getUserToken,
  deleteContact,
  addContact,
  editContact,
  getAllContactsAddByUser,
  checkEmailExistInContacts,
  getSearchContacts
};
