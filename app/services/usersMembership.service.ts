
import usersMembershipDao from '../daos/usersMembership.dao';
import { UsersMembershipDto } from '../model/usersMembership.model';
import { getFromByPage } from '../util/BackendUtil'

class UsersMembershipService {
    private static instance: UsersMembershipService;

    static getInstance(): UsersMembershipService {
        if (!UsersMembershipService.instance) {
            UsersMembershipService.instance = new UsersMembershipService();
        }
        return UsersMembershipService.instance;
    }

    async get(uuid_user: string, page: number, offset: number) {
        var uuid_user = uuid_user
        var from = getFromByPage(page, offset)
        var offset = offset
        return await usersMembershipDao.getList(uuid_user, from, offset)
    }

    async count(uuid_user: string) {
        var uuid_user = uuid_user
        return await usersMembershipDao.countList(uuid_user)
    }

    async countActiveMembership(uuid_user: string) {
        var uuid_user = uuid_user
        return await usersMembershipDao.countActiveMembership(uuid_user)
    }

    async start(uuid_user: string) {
        await usersMembershipDao.updateMembershipStatus(uuid_user, true);

        var countByDate: any = await usersMembershipDao.countActiveMembershipByDate(uuid_user)
        if (countByDate == 0) {
            await usersMembershipDao.insertMembership(uuid_user)
        }
        return
    }

    async cancel(uuid_user: string) {
        await usersMembershipDao.updateMembershipStatus(uuid_user, false);
        return
    }
}

export default UsersMembershipService.getInstance();