import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';

export class AppRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AppRoutes');
    }

    configureRoutes() {

        return this.app;
    }
}