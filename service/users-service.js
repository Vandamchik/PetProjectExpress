const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/users-model');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const HttpError = require('../models/http-error');
const UserDto = require('../dtos/user-dto');


class UsersService {
    async registration(email, password) {
        const singleUser = await UserModel.findOne({ email });
        if (singleUser) {
            return new HttpError(`User with ${ email } is already exist`, 409);
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4()
        const user = await UserModel.create({ email, password: hashPassword });
        await mailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

}

module.exports = new UsersService();
