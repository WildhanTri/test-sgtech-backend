import mysql from 'mysql2';

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "libr-form"
});

export default con