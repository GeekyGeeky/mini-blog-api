import { asyncHandler } from '../middlewares/async_handler';
import ErrorResponse from '../utils/error_response';
import { JsonResponse } from '../utils/helpers';

//import models
import UserModel from '../models/user';

export default class UserController {

    static getUserProfile = asyncHandler(
        async (req, res, next) => {
            const { user, params } = req;

            // find user by username
            const findUser = await UserModel.findOne({ username: params.username });

            //   // throw error if user not found
            if (!findUser) return next(new ErrorResponse('User profile not found', 400));

            // display user profile
            const isProfile = user.username === params.username;
            return new JsonResponse(422).success(res, "User profile found", { ...findUser.toObject(), isProfile });

        });
}
