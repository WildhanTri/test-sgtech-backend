import express from 'express';
import debug from 'debug';
import { objectResponse, pagingResponse } from '../response/responses'
import { v4 as uuidv4 } from 'uuid';
import { getFromByPage, getPageCount } from '../util/BackendUtil'
import moviesService from '../services/movies.service';

const log: debug.IDebugger = debug('app:movie-controller');
class MoviesController {
    private static instance: MoviesController;

    static getInstance(): MoviesController {
        if (!MoviesController.instance) {
            MoviesController.instance = new MoviesController();
        }
        return MoviesController.instance;
    }

    async get(req: express.Request, res: express.Response) {
        var user_uuid = req.body.user.user_uuid
        var query = req.query.q ? req.query.q.toString() : ""
        var page = req.query.page ? Number(req.query.page) : 1
        var offset = req.query.page ? Number(req.query.offset) : 1000

        const movies = await moviesService.get(user_uuid,query, page, offset)
        const row_count = await moviesService.count(query)
        if (movies != null) {
            res.status(200).send(pagingResponse("Berhasil", movies, page, offset, getPageCount(row_count, offset), row_count));
        } else {
            res.status(401).send(pagingResponse("Gagal", movies));
        }
    }

    async getDetail(req: express.Request, res: express.Response) {
        var user_uuid = req.body.user.user_uuid
        var uuid = req.params.movie_uuid
        const movies = await moviesService.getDetail(user_uuid, uuid)
        if (movies != null) {
            res.status(200).send(objectResponse("Berhasil", movies));
        } else {
            res.status(401).send(objectResponse("Gagal", movies));
        }
    }

    async getHomeRow(req: express.Request, res: express.Response) {

        const home_row = await moviesService.getHomeRow()
        res.status(200).send(objectResponse("Berhasil", home_row));

    }

    async getHomeRowMovies(req: express.Request, res: express.Response) {
        var uuid = req.params.home_row_uuid
        const home_row = await moviesService.getHomeRowMovies(uuid)
        res.status(200).send(objectResponse("Berhasil", home_row));

    }

    async buyMovie(req: express.Request, res: express.Response) {
        var movie_uuid = req.params.movie_uuid
        var user_uuid = req.body.user.user_uuid

        var checkMovieByUser = await moviesService.checkMovieByUser(movie_uuid, user_uuid)
        console.log(checkMovieByUser + " <= aodkwoakdoaskodiwhjsoij")
        if (checkMovieByUser) {
            res.status(500).send(objectResponse("Movie sudah pernah dibeli"));
            return
        }

        await moviesService.buyMovie(movie_uuid, user_uuid)
        res.status(200).send(objectResponse("Berhasil"));
    }
}

export default MoviesController.getInstance();