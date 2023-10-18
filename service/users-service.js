const UserModel = require('../models/users-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const HttpError = require('../models/http-error');


class UsersService {
    async registration(email, password) {
        const singleUser = await UserModel.findOne({ email });
        if (singleUser) {
            throw new HttpError(`User with ${ email } is already exist`, 409);
        }
        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4()
        const user = await UserModel.create({ email, password: hashPassword });
        await mailService.sendActivationMail(email, activationLink);
    }

}

module.exports = new UsersService();
