const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/users-model');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const HttpError = require('../models/http-error');
const UserDto = require('../dtos/user-dto');


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
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async activate(activationLink, email) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw  HttpError.BadRequest('Not correct activation link')
        }
        await user.updateOne({ isActivated: true, activationLink });
    }

}

module.exports = new UsersService();
