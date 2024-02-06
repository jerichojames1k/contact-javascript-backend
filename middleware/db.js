//MySQL details

    var mysql = require('mysql');
    // get the promise implementation, we will use bluebird
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
    });
    


// connection.connect(function(err){
//     if(!err) {
//         console.log("Database is connected");
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     } else {
//         console.log("Error while connecting with database");
//     }
// });
 module.exports = connection;
