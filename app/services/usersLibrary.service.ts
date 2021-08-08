
import usersLibraryDao from '../daos/usersLibrary.dao';
import { getFromByPage } from '../util/BackendUtil'

class UsersLibraryService {
    private static instance: UsersLibraryService;

    static getInstance(): UsersLibraryService {
        if (!UsersLibraryService.instance) {
            UsersLibraryService.instance = new UsersLibraryService();
        }
        return UsersLibraryService.instance;
    }

    async get(uuid_user: string, query: string, page: number, offset: number) {
        var uuid_user = uuid_user
        var from = getFromByPage(page, offset)
        var offset = offset
        return await usersLibraryDao.getList(uuid_user, query, from, offset)
    }

    async count(uuid_user: string, query: string) {
        var uuid_user = uuid_user
        return await usersLibraryDao.countList(uuid_user, query)
    }
}

export default UsersLibraryService.getInstance();