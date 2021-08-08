import { UsersDto } from "../model/users.model";
import shortid from "shortid";
import debug from 'debug';
import connection from '../../conn';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    private static instance: UsersDao;
    users: Array<UsersDto> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

    static getInstance(): UsersDao {
        if (!UsersDao.instance) {
            UsersDao.instance = new UsersDao();
        }
        return UsersDao.instance;
    }

    async getUserByEmail(email: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [email]);
        var data = JSON.parse(JSON.stringify(rows))
        if (data.length == 0) {
            return null
        }
        return data[0]
    }

    async getUserByEmailAndPassword(email: string, password: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE user_email = ? AND user_password = ?', [email, password]);
        var data = JSON.parse(JSON.stringify(rows))
        if (data.length == 0) {
            return null
        }
        return data[0]
    }

    async validateToken(token: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE user_token = ?', [token]);
        var data = JSON.parse(JSON.stringify(rows))
        if (data.length == 0) {
            return null
        }
        return data[0]
    }

    // CRUD
    async getDetail(user_uuid: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "SELECT * FROM users WHERE user_uuid = ? "
        ps.push(user_uuid)

        const [rows, fields] = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows))
        if (data.length == 0) {
            return null
        }
        return data[0]
    }

    async get(query: string, from: number, offset: number) {
        const mysql = require('mysql2/promise');
        
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "SELECT * FROM users WHERE 1=1 "
        if (query) {
            sql += " AND ( user_first_name LIKE ? AND user_last_name LIKE ? AND user_email LIKE ? ) "
            ps.push(`%${query}%`);
            ps.push(`%${query}%`);
        }
        if (from != null && offset != null) {
            sql += " LIMIT ? , ? "
            ps.push(from); ps.push(offset)
        }

        const [rows, fields] = await connection.execute(sql, ps);
        console.log(rows)
        var data = JSON.parse(JSON.stringify(rows))
        return data
    }

    async create(user: UsersDto) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "INSERT INTO `users` (`user_uuid`, `user_first_name`, `user_last_name`, `user_email`, `user_password`, `user_birthday`, `user_gender`) VALUES (?, ?, ?, ?, ? ?, ?);"
        ps.push(user.user_uuid)
        ps.push(user.user_first_name)
        ps.push(user.user_last_name)
        ps.push(user.user_email)
        ps.push(user.user_password)
        ps.push(user.user_birthday)
        ps.push(user.user_gender)

        await connection.execute(sql, ps);
        return
    }

    async update(user: UsersDto) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "UPDATE users SET user_email = ?, user_first_name = ?, user_last_name = ?, user_birthday = ?, user_gender = ?  WHERE user_uuid = ? "
        ps.push(user.user_email)
        ps.push(user.user_first_name)
        ps.push(user.user_last_name)
        ps.push(user.user_birthday)
        ps.push(user.user_gender)
        ps.push(user.user_uuid)


        await connection.execute(sql, ps);
        return
    }

    async delete(user_uuid: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "DELETE FROM users WHERE user_uuid = ? "
        ps.push(user_uuid)

        await connection.execute(sql, ps);
        return
    }

    async updateToken(uuid: string, token: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "UPDATE users SET user_token = ? WHERE user_uuid = ? "
        ps.push(token)
        ps.push(uuid)

        await connection.execute(sql, ps);
        return
    }
}

export default UsersDao.getInstance();