import { verify } from 'jsonwebtoken';
// const User = require('../models/User');
import ErrorResponse from '../utils/error_response';
import { asyncHandler } from './async_handler';
import config from '../config';

export default asyncHandler(
    async (req, res, next) => {
        let authHeader = req.headers.authorization;
        let token = authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1];

        if (!token) {
            return next(new ErrorResponse('Unauthorized access', 401));
        }
        try {
            const decoded = verify(token, config.secrets.jwt);
            req.user = decoded.result;
            next();
        } catch (e) {
            return next(new ErrorResponse('Unauthorized access', 401));
        }
    })