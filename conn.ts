import mysql from 'mysql2/promise';

export const conn = mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' })

export default conn