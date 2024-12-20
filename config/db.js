const mysql = require("mysql2/promise");

const sqlconnect = mysql.createPool({
 host: 'localhost',
 user: 'root',
 password: 'tanishk@1234',
 database: 'students_db'
});

// sqlconnect.connect((err) => {
//  if (err) console.log("Not connnected to DB server");
//   console.log("connected to DB server");
// });

// const mysql = require("mysql2/promise");

// const sqlconnect = mysql.createPool({
//    host: 'localhost',
//  user: 'root',
//  password: 'tanishk@1234',
//  database: 'students_db'
// });

module.exports = sqlconnect;