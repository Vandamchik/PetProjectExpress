const HttpError = require('../models/http-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeaderToken = req.headers.authorization;
        if (!authorizationHeaderToken) {
            return next(HttpError.UnauthorizedError());
        }
        const accessToken = authorizationHeaderToken.split(' ')[1];
        if (!accessToken) {
            return next(HttpError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(HttpError.UnauthorizedError());
        }
        req.user = userData;
        next()
    } catch (e) {
        return next(HttpError.UnauthorizedError());
    }
}
