const HttpError = require('../models/http-error');

module.exports = function (err,req,res,next) {
    console.log(err);
    if (err instanceof HttpError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({message: 'Unexpected error on server side'});
}
