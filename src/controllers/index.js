import { asyncHandler } from '../middlewares/async_handler';
import ErrorResponse from '../utils/error_response';

export default class IndexController {

    static loginUser = asyncHandler(
        async (req, res, next) => {
            return next(new ErrorResponse('Invalid credentials', 401));
            //   let { email, password } = req.body;
            //   if (!email || !password) {
            //     return res.status(422).json({
            //       status: false,
            //       message: "Email and password is required!"
            //     });

            //   }
            //   email = email.toLowerCase();
            //   // find user by email
            //   const user = await User.findOne({ email }).select('+password');
            //   // throw error if user not found
            //   if (!user) return next(new ErrorResponse('Invalid credentials', 401));

            //   //check if verified
            //   if (!user.emailVerified) return next(new ErrorResponse('Please verify your account', 401));

            //   // check user password
            //   const isMatch = await user.comparePassword(password);
            //   if (!isMatch) return next(new ErrorResponse('Invalid credentials', 401));
            //   //check user email is verifed


            //   // set password to undefined and get user token
            //   user.password = undefined;
            //   const token = user.getJwtToken();

            //   return res.status(200).json({
            //     status: true,
            //     message: "User logged in successfully",
            //     data:
            //     {
            //       user: user,
            //       token: token,
            //     }
            //   });

        });
}

// const indexController = new IndexController();

// export default indexController;