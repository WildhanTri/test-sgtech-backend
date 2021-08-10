import { UsersDto } from "../model/users.model";
import shortid from "shortid";
import debug from 'debug';
import { conn, db } from '../../conn';
import { UsersMembershipDto } from "../model/usersMembership.model";

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersMembershipDao {
    private static instance: UsersMembershipDao;
    users: Array<UsersDto> = [];

    constructor() {
        log('Created new instance of UsersMembershipDao');
    }

    static getInstance(): UsersMembershipDao {
        if (!UsersMembershipDao.instance) {
            UsersMembershipDao.instance = new UsersMembershipDao();
        }
        return UsersMembershipDao.instance;
    }

    // CRUD
    async getList(uuid_user: string, from: number, offset: number): Promise<UsersMembershipDto[]> {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(db);

        var ps = []
        var sql = "SELECT um.* FROM users_memberships um INNER JOIN users u ON u.user_id = um.user_membership_user_id WHERE u.user_uuid = ? ORDER BY um.user_membership_end_date DESC LIMIT ?,?";
        ps.push(uuid_user)
        ps.push(from)
        ps.push(offset)

        const [rows, fields] = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows))
        return data.map((da: any) => UsersMembershipDto.fromObject(da))
    }

    async countList(uuid_user: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(db);

        var ps = []
        var sql = "SELECT COUNT(*) as count FROM users_memberships um INNER JOIN users u ON u.user_id = um.user_membership_user_id WHERE u.user_uuid = ?"
        ps.push(uuid_user)

        const [rows, fields]: any = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows[0]["count"]))
        return data
    }

    async countActiveMembership(uuid_user: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(db);

        var ps = []
        var sql = "SELECT COUNT(*) as count FROM users u WHERE u.user_uuid = ? AND u.user_membership_status = 1"
        ps.push(uuid_user)

        const [rows, fields]: any = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows[0]["count"]))
        return data
    }

    async countActiveMembershipByDate(uuid_user: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(db);

        var ps = []
        var sql = "SELECT COUNT(*) as count FROM users u INNER JOIN users_memberships um ON um.user_membership_user_id = u.user_id WHERE u.user_uuid = ? AND um.user_membership_end_date > DATE(NOW())"
        ps.push(uuid_user)

        const [rows, fields]:any = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows[0]["count"]))
        return data
    }

    async updateMembershipStatus(uuid_user: string, status: boolean) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(db);

        var ps = []
        var sql = "UPDATE users SET user_membership_status = ? WHERE user_uuid = ? "
        ps.push(status)
        ps.push(uuid_user)

        await connection.execute(sql, ps);
        return
    }

    async insertMembership(uuid_user: any) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection(db);

        var ps = []
        var sql = "INSERT INTO `test-sgtech-db`.`users_memberships`(`user_membership_user_id`, `user_membership_start_date`, `user_membership_end_date`) VALUES ((SELECT user_id FROM users WHERE user_uuid = ?), DATE(NOW()), DATE(NOW()) + INTERVAL 1 MONTH); "
        ps.push(uuid_user)

        await connection.execute(sql, ps);
        return
    }
}

export default UsersMembershipDao.getInstance();