const UserDto = require('../dtos/user-dto');
const tokenService = require("../service/token-service");

module.exports = async function (user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
}



