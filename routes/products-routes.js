const Router = require('express').Router;

const router = new Router();

router.get('/', (req,res, next) => {
    res.json({message: 'Products Work'})
});

module.exports = router;
