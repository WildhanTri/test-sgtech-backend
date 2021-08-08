import express from 'express';
import debug from 'debug';
import { objectResponse } from '../response/responses'
import { v4 as uuidv4 } from 'uuid';
import { convertISODateToYYYYMMDD } from '../util/BackendUtil';
import usersMembershipService from '../services/usersMembership.service';

const log: debug.IDebugger = debug('app:usersMembership-controller');
class UsersMembershipController {
    private static instance: UsersMembershipController;

    static getInstance(): UsersMembershipController {
        if (!UsersMembershipController.instance) {
            UsersMembershipController.instance = new UsersMembershipController();
        }
        return UsersMembershipController.instance;
    }

    async get(req: express.Request, res: express.Response) {
        var query = req.query.q ? req.query.q.toString() : ""
        var page = req.query.page ? Number(req.query.page) : 1
        var offset = req.query.page ? Number(req.query.offset) : 1000

        const users = await usersMembershipService.get(query, page, offset)
        if (users != null) {
            res.status(200).send(objectResponse("Berhasil"));
        } else {
            res.status(401).send(objectResponse("Gagal"));
        }
    }

    async start(req: express.Request, res: express.Response) {
        var uuidUser = req.body.user.user_uuid
        var count = await usersMembershipService.countActiveMembership(uuidUser)
        if (count > 0) {
            res.status(401).send(objectResponse("Anda sudah terdaftar membership", null));
            return
        }

        await usersMembershipService.start(uuidUser)

        res.status(200).send(objectResponse("Berhasil"));
    }

    async cancel(req: express.Request, res: express.Response) {
        var uuidUser = req.body.user.user_uuid

        await usersMembershipService.cancel(uuidUser)
        res.status(200).send(objectResponse("Berhasil"));
    }
}

export default UsersMembershipController.getInstance();