const Router = require('express').Router;
const { check } = require('express-validator');

const userController = require('../controllers/users-controller');
const authMiddleware = require('../middlewares/auth-middleware');

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

router.post(
    '/login',
    [
        check('email')
            .isEmail()
            .normalizeEmail(),
        check('password')
            .isLength({ min: 6 })
        ],
    userController.login
);

router.post('/logout', authMiddleware,userController.logout);

router.get('/refresh', userController.refresh);

router.get('/activate/:email/:link', userController.activate);

router.get(
    '/allClients',
   authMiddleware,
    userController.getClients
);

module.exports = router;
