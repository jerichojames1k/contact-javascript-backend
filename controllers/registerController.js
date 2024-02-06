
const crud=require('../crud/crud.js')
const bcrypt = require('bcrypt');
const handleNewUser = async (req, res) => {
    const { user, pwd,email } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate userEmail in the db
    crud.getUserByEmail(email)(async  (results) =>{  
        const duplicate=results?.[0]
        if (duplicate)
        {
            return res.sendStatus(409); //Conflict 
        } 
        try {
            //encrypt the password
            const hashedPwd = await bcrypt.hash(pwd, 10);
            //store the new user
       const newUser = { "username": user,"emailAddress":email,"password": hashedPwd ,"roles":[2001,5150],refreshToken:""};
       crud.create(newUser)(async  (results) =>{  
            return res.json(results?.[0]);
         });
        res.status(201).json({ 'success': `New user ${user} created!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
     });
 
 
}

module.exports = { handleNewUser };