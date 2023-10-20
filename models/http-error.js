module.exports = class HttpError extends Error {
    status;
    errors;
    constructor(message, status, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new HttpError('User is not authorize yet', 401);
    }

    static BadRequest(message, errors = []) {
        return new HttpError(message, 400, errors );
    }
};

