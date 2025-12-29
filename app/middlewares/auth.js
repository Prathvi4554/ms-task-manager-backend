const jwt = require('jsonwebtoken');
const loadConfig = require('../config/config')


const verifyJWT = async (ctx, next) => {

    try {
        const authorization = ctx.headers.authorization;

        if (!authorization) {
            ctx.status = 401;
            ctx.body = { message: 'Token missing' };
            return;
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            ctx.status = 401;
            ctx.body = { message: 'Invalid token format' };
            return;
        }

        jwt.verify(token, loadConfig.jwtSecretKey);

        return await next()

    } catch (err) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid or expired token' };
    }
}


module.exports = {
    verifyJWT
}