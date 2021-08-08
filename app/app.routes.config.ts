import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import usersController from './controllers/users.controller';

export class AppRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AppRoutes');
    }

    configureRoutes() {
        // USER
        this.app.route(`/v1/user/login`)
            .post(usersController.login)
        this.app.route(`/v1/user/registration`)
            .post(usersController.registration)

        return this.app;
    }
}