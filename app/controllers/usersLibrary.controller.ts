import express from 'express';
import debug from 'debug';
import { objectResponse, pagingResponse } from '../response/responses'
import { v4 as uuidv4 } from 'uuid';
import usersLibraryService from '../services/usersLibrary.service';
import usersLibraryDao from '../daos/usersLibrary.dao';
import { getPageCount } from '../util/BackendUtil';

const log: debug.IDebugger = debug('app:usersMembership-controller');
class UsersLibraryController {
    private static instance: UsersLibraryController;

    static getInstance(): UsersLibraryController {
        if (!UsersLibraryController.instance) {
            UsersLibraryController.instance = new UsersLibraryController();
        }
        return UsersLibraryController.instance;
    }

    async get(req: express.Request, res: express.Response) {
        var user_uuid = req.body.user.user_uuid

        var query = req.query.q ? req.query.q.toString() : ""
        var page = req.query.page ? Number(req.query.page) : 1
        var offset = req.query.page ? Number(req.query.offset) : 1000

        const movies = await usersLibraryService.get(user_uuid, query, page, offset)
        const row_count = await usersLibraryService.count(user_uuid, query)
        if (movies != null) {
            res.status(200).send(pagingResponse("Berhasil", movies, page, offset, getPageCount(row_count, offset), row_count));
        } else {
            res.status(401).send(pagingResponse("Gagal", movies));
        }
    }
}

export default UsersLibraryController.getInstance();