const { validationResult } = require('express-validator');

const userService = require('../service/users-service');
const HttpError = require('../models/http-error');

class UsersController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(HttpError.BadRequest('Wrong name, email or password', errors.array()))
            }
            const { email, password, name, isAdmin } = req.body;
            const userData = await userService.registration(email, password, name, isAdmin);
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true }
            );
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(HttpError.BadRequest('Wrong email or password', errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true }
            );
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params['link'];
            const userEmail = req.params['email'];
            await userService.activate(activationLink, userEmail);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true }
            );
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getClients(req, res, next) {
        try {
            const { isAdmin } = req.body;
            if (!isAdmin) {
                return next(HttpError.NoPermits('You is not admin,please login as admin'));
            }
            const clients = await userService.getAllClients();
            res.json(clients)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UsersController();
