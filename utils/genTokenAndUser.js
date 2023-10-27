const UserDto = require('../dtos/user-dto');
const tokenService = require("../service/token-service");
const TokenModel = require('../models/token-model');

module.exports = async function (user) {
    const userDto = new UserDto(user);
    const prevToken = await TokenModel.findOne({user: userDto.id});
    if (!!prevToken) await TokenModel.deleteOne({user: userDto.id});
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
}



