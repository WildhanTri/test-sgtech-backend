import { UsersDto } from "../model/users.model";
import shortid from "shortid";
import debug from 'debug';
import connection from '../../conn';
import { MoviesDTO } from "../model/movies.model";

const log: debug.IDebugger = debug('app:in-memory-dao');

class MoviesDao {
    private static instance: MoviesDao;
    users: Array<UsersDto> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }

    static getInstance(): MoviesDao {
        if (!MoviesDao.instance) {
            MoviesDao.instance = new MoviesDao();
        }
        return MoviesDao.instance;
    }

    // CRUD
    async getDetail(movie_uuid: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "SELECT m.*, mt.movie_type_uuid, mt.movie_type_name, mc.movie_classification_uuid, mc.movie_classification_name FROM movies m INNER JOIN movies_type mt ON mt.movie_type_id = m.movie_type_id INNER JOIN movies_classification mc ON mc.movie_classification_id = m.movie_classification_id WHERE m.movie_uuid = ?"
                
        ps.push(movie_uuid)

        const [rows, fields] = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows))
        if (data.length == 0) {
            return null
        }
        return MoviesDTO.fromObject(data[0])
    }

    async getList(query: string, from: number, offset: number): Promise<MoviesDTO[]> {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "SELECT m.*, mt.movie_type_uuid, mt.movie_type_name, mc.movie_classification_uuid, mc.movie_classification_name FROM movies m INNER JOIN movies_type mt ON mt.movie_type_id = m.movie_type_id INNER JOIN movies_classification mc ON mc.movie_classification_id = m.movie_classification_id WHERE 1=1 "
        if (query) {
            sql += " AND m.movie_title LIKE ?  "
            ps.push(`%${query}%`);
        }
        if (from != null && offset != null) {
            sql += " LIMIT ? , ? "
            ps.push(from); ps.push(offset)
        }

        const [rows, fields] = await connection.execute(sql, ps);
        var data = JSON.parse(JSON.stringify(rows))
        return data.map((da: any) => MoviesDTO.fromObject(da))
    }

    async countList(query: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "SELECT COUNT(*) as count FROM movies m INNER JOIN movies_type mt ON mt.movie_type_id = m.movie_type_id INNER JOIN movies_classification mc ON mc.movie_classification_id = m.movie_classification_id WHERE 1=1 "
        if (query) {
            sql += " AND m.movie_title LIKE ? "
            ps.push(`%${query}%`);
        }

        console.log("Asdoawkdokwodk => ");
        const [rows, fields] = await connection.execute(sql, ps);
        console.log("Asdoawkdokwodk => " + rows);
        var data = JSON.parse(JSON.stringify(rows[0]["count"]))
        return data
    }

    async create(movie: MoviesDTO) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "INSERT INTO `test-sgtech-db`.`movies`(`movie_uuid`, `movie_title`, `movie_synopsis`, `movie_type_id`, `movie_classification_id`, `movie_price`, `movie_is_subscription_availability`, `movie_thumbnail_vertical_url`, `movie_thumbnail_horizontal_url`, `movie_year`) VALUES ( ?, ?, ?, (SELECT id FROM movies_type WHERE uuid = ?), (SELECT id FROM movies_classification WHERE uuid = ? ), ?, ?, ?, ?, ?); "
        ps.push(movie.movie_uuid)
        ps.push(movie.movie_title)
        ps.push(movie.movie_synopsis)
        ps.push(movie.movie_type_uuid)
        ps.push(movie.movie_classification_uuid)
        ps.push(movie.movie_price)
        ps.push(movie.movie_is_subscription_availability)
        ps.push(movie.movie_thumbnail_vertical_url)
        ps.push(movie.movie_thumbnail_horizontal_url)
        ps.push(movie.movie_year)

        await connection.execute(sql, ps);
        return
    }

    async update(movie: MoviesDTO) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "UPDATE `test-sgtech-db`.`movies` SET `movie_title` = ?, `movie_synopsis` = ?, `movie_type_id` = ?, `movie_classification_id` = ?,  `movie_price` = ?, `movie_is_subscription_availability` = ?, `movie_thumbnail_vertical_url` = ?, `movie_thumbnail_horizontal_url` = ?, `movie_year` = ? WHERE `movie_uuid` = ?;"
        ps.push(movie.movie_title)
        ps.push(movie.movie_synopsis)
        ps.push(movie.movie_type_uuid)
        ps.push(movie.movie_classification_uuid)
        ps.push(movie.movie_price)
        ps.push(movie.movie_is_subscription_availability)
        ps.push(movie.movie_thumbnail_vertical_url)
        ps.push(movie.movie_thumbnail_horizontal_url)
        ps.push(movie.movie_year)
        ps.push(movie.movie_uuid)

        await connection.execute(sql, ps);
        return
    }

    async delete(moive_uuid: string) {
        const mysql = require('mysql2/promise');
        const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: "root", database: 'test-sgtech-db' });

        var ps = []
        var sql = "DELETE FROM movie WHERE movie_uuid = ? "
        ps.push(moive_uuid)

        await connection.execute(sql, ps);
        return
    }
}

export default MoviesDao.getInstance();