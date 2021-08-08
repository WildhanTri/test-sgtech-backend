import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import usersController from './controllers/users.controller';
import usersMiddleware from './middleware/users.middleware';
import moviesController from './controllers/movies.controller';
import usersMembershipController from './controllers/usersMembership.controller';
import usersLibraryController from './controllers/usersLibrary.controller';

export class AppRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AppRoutes');
    }

    configureRoutes() {
        // USER
        this.app.route(`/v1/user/profile`)
            .get(usersMiddleware.validateToken, usersController.getProfile)
            .patch(usersMiddleware.validateToken, usersController.updateProfile)
        this.app.route(`/v1/user/editPassword`)
            .patch(usersMiddleware.validateToken, usersController.editPassword)
        this.app.route(`/v1/user/login`)
            .post(usersController.login)
        this.app.route(`/v1/user/registration`)
            .post(usersController.registration)
        this.app.route(`/v1/user/forgotPassword`)
            .patch(usersController.forgotPassword)

        // MOVIE
        this.app.route(`/v1/movie`)
            .get(usersMiddleware.validateToken, moviesController.get)
        this.app.route(`/v1/movie/:movie_uuid`)
            .get(usersMiddleware.validateToken, moviesController.getDetail)
        this.app.route(`/v1/movie/:movie_uuid/buy`)
            .post(usersMiddleware.validateToken, moviesController.buyMovie)

        // USER MEMBERSHIP
        this.app.route(`/v1/membership/start`)
            .post(usersMiddleware.validateToken, usersMembershipController.start)
        this.app.route(`/v1/membership/cancel`)
            .delete(usersMiddleware.validateToken, usersMembershipController.cancel)

        // USER LIBRARY
        this.app.route(`/v1/library`)
            .get(usersMiddleware.validateToken, usersLibraryController.get)

        return this.app;
    }
}