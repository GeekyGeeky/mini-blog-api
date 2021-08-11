import { Router } from 'express';
import verifyAuth from '../middlewares/auth_handler';
import Validator from '../utils/validator';

// import controllers
import indexController from '../controllers';

//import routers
import UsersRouter from './users';
import BlogpostRouter from './blogpost';

class IndexRouter {
    constructor() {
        this.router = Router();
    }
    index = (req, res) => {
        res.json({ status: true, message: "Bloggie Base API Endpoint" })
    }
    routes = () => {
        this.router.get('/', this.index);
        this.router.post('/login', Validator.loginValidator, indexController.loginUser);
        this.router.post('/register', Validator.signupValidator, indexController.registerUser);
        this.router.use('/posts', BlogpostRouter);
        this.router.use('/users', verifyAuth, UsersRouter);

        //return the base router
        return this.router;
    }
}
export default new IndexRouter().routes();