
import shortid from "shortid";
import debug from 'debug';
import connection, { conn } from '../../conn';
import { UsersLibraryDto } from "../model/usersLibrary.model";
import { MoviesDTO } from "../model/movies.model";

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersLibraryDao {
    private static instance: UsersLibraryDao;
    users: Array<UsersLibraryDto> = [];

    constructor() {
        log('Created new instance of UsersLibraryDao');
    }

    static getInstance(): UsersLibraryDao {
        if (!UsersLibraryDao.instance) {
            UsersLibraryDao.instance = new UsersLibraryDao();
        }
        return UsersLibraryDao.instance;
    }

    // CRUD
    async getList(uuid_user: string, query:string, from: number, offset: number): Promise<UsersLibraryDto[]> {
        const mysql = require('mysql2/promise');
        const connection = await conn;

        var ps = []
        var sql = "SELECT m.* FROM users_libraries ul INNER JOIN users u ON u.user_id = ul.user_library_user_id INNER JOIN movies m ON m.movie_id = ul.user_library_movie_id WHERE u.user_uuid = ? ";
        ps.push(uuid_user)
        if (query) {
            sql += " AND m.movie_title LIKE ?  "
            ps.push(`%${query}%`);
        }
        sql += " ORDER BY ul.user_library_created_date DESC "
        if (from != null && offset != null) {
            sql += " LIMIT ? , ? "
            ps.push(from); ps.push(offset)
        }

        const [rows, fields] = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows))
        console.log("oawkowakowakdasoidhjasoid => " + JSON.stringify(data))
        return data.map((da: any) => MoviesDTO.fromObject(da))
    }

    async countList(uuid_user: string, query:string) {
        const mysql = require('mysql2/promise');
        const connection = await conn;

        var ps = []
        var sql = "SELECT COUNT(*) as count FROM users_libraries ul INNER JOIN users u ON u.user_id = ul.user_library_user_id INNER JOIN movies m ON m.movie_id = ul.user_library_movie_id WHERE u.user_uuid = ? "
        ps.push(uuid_user)
        if (query) {
            sql += " AND m.movie_title LIKE ?  "
            ps.push(`%${query}%`);
        }

        const [rows, fields]:any = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows[0]["count"]))
        return data
    }
}

export default UsersLibraryDao.getInstance();