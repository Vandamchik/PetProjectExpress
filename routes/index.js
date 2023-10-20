const Router = require('express').Router;

const usersRouter = require('./users-routes');
const productRouter = require('./products-routes');

const router = new Router();

router.use('/auth', usersRouter);
router.use('/products', productRouter);

module.exports = router;
