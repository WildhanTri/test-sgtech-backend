import mysql from 'mysql2/promise';

// DEV
// export const conn = mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' })
// PROD
export const conn = mysql.createConnection({ host: 'eu-cdbr-west-01.cleardb.com', user: 'b5b0b133ecb10e', password: "e8863f28", database: 'heroku_5bc85757d440e75' })

export default conn