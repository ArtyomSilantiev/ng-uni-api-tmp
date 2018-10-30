const _ = require('lodash');
const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    console.log('logs', req.originalUrl);
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    next();
});

router.use(async (req, res, next) => {
    try {
        let token = req.headers['x-auth-token'] || req.query.token;
        req.token = token;
        req.language = req.headers['x-language'] || req.query.language || 'en';
        next();
    } catch (error) {
        next(error);
    }
});

router.get('/user/auth', (req, res, next) => {
    if (!req.token) {
        req.toket = Date.now().toString(36) + '-' + _.random(Math.pow(36, 2), Math.pow(36, 3)).toString(36);
    }

    res.json({
        code: 200,
        data: {
            toket: req.toket
        }
    })
});

module.exports = router;
