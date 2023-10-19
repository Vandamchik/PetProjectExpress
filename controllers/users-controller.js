const userService = require('../service/users-service');

class UsersController {
    async registration(req,res,next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email,password);
            const cookieOptions = { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true };
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                cookieOptions)
            res.json(userData)
        } catch (e) {
            res.status(400).send(e)
        }
    }

    async login(req,res,next) {
        try {

        } catch (e) {

        }
    }

    async logout(req,res,next) {
        try {

        } catch (e) {

        }
    }

    async activate(req,res,next) {
        try {

        } catch (e) {

        }
    }

    async refresh(req,res,next) {
        try {

        } catch (e) {

        }
    }

    async getClients(req,res,next) {
        try {
            res.json(["Twerk"])
        } catch (e) {

        }
    }
}

module.exports = new UsersController();
