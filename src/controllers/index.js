const { validationResult } = require('express-validator');
import { asyncHandler } from '../middlewares/async_handler';
import ErrorResponse from '../utils/error_response';
import { JsonResponse } from '../utils/helpers';

//import models
import UserModel from '../models/user';

export default class IndexController {

    static loginUser = asyncHandler(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return new JsonResponse(422).error(res, "error occured", errors.array({ onlyFirstError: true }));
            }
            const { email, password } = req.body;
            // find user by email
            const user = await UserModel.findOne({ email }).select('+password');

            //   // throw error if user not found
            if (!user) return next(new ErrorResponse('Invalid credentials', 401));

            // check user password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));

            //   // set password to undefined and get user token
            user.password = undefined;
            const token = user.getJwtToken();
            return new JsonResponse(200).success(res, "User logged in successfully", { ...user.toObject(), token});

        });

    static registerUser = asyncHandler(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return new JsonResponse(422).error(res, "error occured", errors.array({ onlyFirstError: true }));
            }
            const { name, username, email, password } = req.body;
            // find user by email
            const findUser = await UserModel.findOne({
                $or: [
                    { email },
                    { username }
                ]
            });

            //   // throw error if user not found
            if (findUser) return next(new ErrorResponse('Email or username already exist', 400));

            // create new user
            const user = await UserModel.create({ email, username, password, name });
            const userData = { name, email, username, dateJoined: user.dateJoined };
            return new JsonResponse(201).success(res, "User created successfully", userData);

        });
}
