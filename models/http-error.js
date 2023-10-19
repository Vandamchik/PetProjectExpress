class HttpError extends Error {
    code;
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }

    static UnauthorizedError() {
        return new HttpError('User is not authorize yet', 401);
    }

    static BadRequest(message) {
        return new HttpError(message, 400);
    }
}

module.exports = HttpError;
