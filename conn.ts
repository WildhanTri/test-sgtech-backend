import mysql from 'mysql2/promise';

// DEV
// export const conn = mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' })
// PROD
export const conn = mysql.createConnection({ host: 'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', user: 'y1il3zodfwogi2n6', password: "duyr4pazfigk78is", database: 'ud8q5v4kdwoqcn4p' })

// DEV
// export const db = { host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' }
// PROD
export const db = { host: 'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', user: 'y1il3zodfwogi2n6', password: "duyr4pazfigk78is", database: 'ud8q5v4kdwoqcn4p' }