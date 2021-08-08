import UsersDao from '../daos/users.dao';
import { UsersDto } from "../model/users.model";
import usersDao from '../daos/users.dao';
import { generateAccessToken } from '../util/JWTUtil'

class UsersService {
    private static instance: UsersService;

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }

    async login(email: string, password: string) {
        var checkEmail = await UsersDao.getUserByEmail(email);

        if (checkEmail == null)
            return { message: "Email tidak ditemukan" }

        var checkPassword = await UsersDao.getUserByEmailAndPassword(email, password);
        if (checkPassword == null)
            return { message: "Password salah" }

        var token = generateAccessToken(checkPassword.user_uuid)
        await usersDao.updateToken(checkPassword.user_uuid, token)

        return { message: "Login berhasil", object: token }
    }

    async registration(user: UsersDto) {
        var email = user.user_email != null ? user.user_email : ""
        var uuid = user.user_uuid != null ? user.user_uuid : ""
        var checkEmail = await UsersDao.getUserByEmail(email);

        if (checkEmail != null)
            return { message: "Email sudah terdaftar" }

        await usersDao.create(user)

        var token = generateAccessToken(uuid)
        await usersDao.updateToken(uuid, token)

        return { message: "Registrasi berhasil", object: token }
    }

    async get(query: string, page: number, offset: number) {
        var query = ""
        var from = 0
        var offset = 100
        return await usersDao.get(query, from, offset)
    }

    async getDetail(user_uuid: string) {
        return await usersDao.getDetail(user_uuid)
    }

    async create(user: UsersDto) {
        return await usersDao.create(user)
    }

    async update(user: UsersDto) {
        return await usersDao.update(user)
    }

    async delete(user_uuid: string) {
        return await usersDao.delete(user_uuid)
    }

    async validateToken(token: string) {
        var checkToken = await UsersDao.validateToken(token);
        return checkToken
    }
}

export default UsersService.getInstance();