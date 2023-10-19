const userService = require('../service/users-service');

class UsersController {
    async registration(req,res,next) {
        try {
            const { email, password, name } = req.body;
            const userData = await userService.registration(email,password,name);
            const cookieOptions = { maxAge: (30 * 24 * 60 * 60 * 1000), httpOnly: true };
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                cookieOptions);
            res.json(userData);
        } catch (e) {
            next(e)
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
            const activationLink = req.params['link'];
            const userEmail = req.params['email'];
            await userService.activate(activationLink,userEmail);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
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
