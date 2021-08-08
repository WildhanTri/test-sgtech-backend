import express from 'express';
import usersService from '../services/users.service';
import debug from 'debug';
import { objectResponse } from '../response/responses'
import { UsersDto } from '../model/users.model';
import { v4 as uuidv4 } from 'uuid';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {
    private static instance: UsersController;

    static getInstance(): UsersController {
        if (!UsersController.instance) {
            UsersController.instance = new UsersController();
        }
        return UsersController.instance;
    }

    async login(req: express.Request, res: express.Response) {
        const users = await usersService.login(req.body.user_email, req.body.user_password)
        if (users.message == "Login berhasil") {
            res.status(200).send(objectResponse(users.message, users.object));
        } else {
            res.status(401).send(objectResponse(users.message, users.object));
        }
    }

    async registration(req: express.Request, res: express.Response) {
        var uuid = uuidv4()
        const users: UsersDto = {
            user_uuid: uuid,
            user_email: req.body.user_email,
            user_first_name: req.body.user_first_name,
            user_last_name: req.body.user_last_name,
            user_password: req.body.user_password
        }

        const resp = await usersService.registration(users)

        console.log(users)
        if (resp.message == "Login berhasil") {
            res.status(200).send(objectResponse(resp.message, resp.object));
        } else {
            res.status(401).send(objectResponse(resp.message, resp.object));
        }
    }

    async get(req: express.Request, res: express.Response) {
        var query = req.query.q ? req.query.q.toString() : ""
        var page = req.query.page ? Number(req.query.page) : 1
        var offset = req.query.page ? Number(req.query.offset) : 1000

        const users = await usersService.get(query, page, offset)
        if (users != null) {
            res.status(200).send(objectResponse(users, null));
        } else {
            res.status(401).send(objectResponse(users, null));
        }
    }

    async getDetail(req: express.Request, res: express.Response) {
        var uuid = req.params.uuid
        const users = await usersService.getDetail(uuid)
        if (users != null) {
            res.status(200).send(objectResponse(users, null));
        } else {
            res.status(401).send(objectResponse(users, null));
        }
    }

    async create(req: express.Request, res: express.Response) {
        var uuid = uuidv4()
        var user: UsersDto = {
            user_uuid: uuid,
            user_first_name: req.body.user_first_name,
            user_last_name: req.body.user_last_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_token: req.body.user_token,
            user_created_date: req.body.user_created_date,
            user_updated_date: req.body.user_updated_date,
        }

        await usersService.update(user)
        res.status(200).send(objectResponse("Berhasil", user));
    }

    async update(req: express.Request, res: express.Response) {
        var uuid = req.params.user_uuid

        const existUsers = await usersService.getDetail(uuid)
        if (existUsers == null) {
            res.status(400).send(objectResponse("User not found", null))
        }

        var user: UsersDto = {
            user_uuid: uuid,
            user_first_name: req.body.user_first_name,
            user_last_name: req.body.user_last_name,
            user_email: req.body.user_email,
            user_password: req.body.user_password,
            user_token: req.body.user_token,
            user_created_date: req.body.user_created_date,
            user_updated_date: req.body.user_updated_date,
        }

        await usersService.update(user)
        res.status(200).send(objectResponse("Berhasil", user));
    }

    async delete(req: express.Request, res: express.Response) {
        var uuid = req.params.user_uuid

        const existUsers = await usersService.getDetail(uuid)
        if (existUsers == null) {
            res.status(400).send(objectResponse("User not found", null))
        }

        await usersService.delete(uuid)
        res.status(200).send(objectResponse("Berhasil", null));
    }
}

export default UsersController.getInstance();