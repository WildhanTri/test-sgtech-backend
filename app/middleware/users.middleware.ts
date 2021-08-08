import express from 'express';
import userService from '../services/users.service';

class UsersMiddleware {
    private static instance: UsersMiddleware;

    static getInstance() {
        if (!UsersMiddleware.instance) {
            UsersMiddleware.instance = new UsersMiddleware();
        }
        return UsersMiddleware.instance;
    }

    async validateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        var token = req.headers.authorization
        if (token != null) {
            token = token.replace("Bearer ", "")
            const user = await userService.validateToken(token);
            if (user) {
                req.body.user = user
                next();
            } else {
                res.status(401).send({ error: `Invalid token` });
            }
        } else {
            res.status(401).send({ error: `Invalid token` });
        }
    }
}

export default UsersMiddleware.getInstance();