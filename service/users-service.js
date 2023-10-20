const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/users-model');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const HttpError = require('../models/http-error');
const genTokenAndUser = require('../utils/genTokenAndUser');


class UsersService {
    async registration(email, password, name, isAdmin = false) {
        const singleUser = await UserModel.findOne({ email });
        if (singleUser) {
            throw HttpError.BadRequest(`User with ${ email } is already exist`);
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({ email, password: hashPassword, name, isAdmin });
        await mailService.sendActivationMail(email, name, `${process.env.API_URL}/api/auth/activate/${email}/${activationLink}`);
        const userData = await genTokenAndUser(user);
        return userData;
    }

    async activate(activationLink, email) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw  HttpError.BadRequest('Not correct activation link')
        }
        await user.updateOne({ isActivated: true, activationLink });
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw  HttpError.BadRequest(`User with email: ${email} not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw  HttpError.BadRequest(`Password wrong`);
        }
        const userData = await genTokenAndUser(user);
        return userData;
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw HttpError.UnauthorizedError();
        }
        const tokenData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!tokenData || !tokenFromDb) {
            throw HttpError.UnauthorizedError();
        }
        const user = await UserModel.findById(tokenData.id);
        const userData = await genTokenAndUser(user);
        return userData;
    }

    async getAllClients() {
        const allClients = await UserModel.findOne();
        return allClients;
    }

}

module.exports = new UsersService();
