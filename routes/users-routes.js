const Router = require('express').Router;

const userController = require('../controllers/users-controller');
const { check } = require('express-validator');

const router = new Router();

router.post(
    '/registration',
[
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .isEmail()
            .normalizeEmail(),
        check('password')
            .isLength({ min: 6 })
        ],
    userController.registration
);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/activate/:email/:link', userController.activate);

router.get('/refresh', userController.refresh);

router.get('/clients', userController.getClients);

module.exports = router;
