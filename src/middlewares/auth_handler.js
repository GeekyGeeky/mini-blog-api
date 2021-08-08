const { verify } = require('jsonwebtoken');
// const User = require('../models/User');
const ErrorResponse = require('../utils/error_response');
const asyncHandler = require('./async_handler');

module.exports = {
    verifyToken: asyncHandler(
        async (req, res, next) => {
        let token;
        let authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];

        }

        if (!token) {
            return next(new ErrorResponse('Unauthorized access', 401));
        }
        try {
            const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);

            req.user = decoded.result;
            // req.user = await User.findById(decoded.result.id);
            next();
        } catch (e) {
            return next(new ErrorResponse('Unauthorized access', 401));

        }
    })
}