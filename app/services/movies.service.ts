
import moviesDao from '../daos/movies.dao';
import { MoviesDTO } from '../model/movies.model';
import { getFromByPage, getPageCount } from '../util/BackendUtil'

class MoviesService {
    private static instance: MoviesService;

    static getInstance(): MoviesService {
        if (!MoviesService.instance) {
            MoviesService.instance = new MoviesService();
        }
        return MoviesService.instance;
    }

    async get(query: string, page: number, offset: number) {
        var query = query
        var from = getFromByPage(page, offset)
        var offset = offset
        return await moviesDao.getList(query, from, offset)
    }

    async count(query: string) {
        var query = query
        return await moviesDao.countList(query)
    }

    async getDetail(movie_uuid: string) {
        return await moviesDao.getDetail(movie_uuid)
    }

    async checkMovieByUser(movie_uuid: string, user_uuid: string) {
        var count: any = await moviesDao.checkMovieByUser(movie_uuid, user_uuid)
        console.log("awokwaokawokwa => "+count)
        return count > 0
    }

    async buyMovie(movie_uuid: string, user_uuid: string) {
        return await moviesDao.buyMovie(movie_uuid, user_uuid)
    }

    async create(movie: MoviesDTO) {
        return await moviesDao.create(movie)
    }

    async update(movie: MoviesDTO) {
        return await moviesDao.update(movie)
    }

    async updateThumbnail(movie: MoviesDTO) {
        return await moviesDao.update(movie)
    }

    async delete(movie_uuid: string) {
        return await moviesDao.delete(movie_uuid)
    }
}

export default MoviesService.getInstance();