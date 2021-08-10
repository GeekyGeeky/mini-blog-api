import { Router } from 'express';
import verifyAuth from '../middlewares/auth_handler';

// import controllers
import indexController from '../controllers';

//import routers
import UsersRouter from './users';

class IndexRouter {
    constructor() {
        this.router = Router();
    }
    index = (req, res) => {
        res.json({ status: true, message: "Base router" })
    }
    loginUser = async (req, res) => {
        const user = await this.checkUser();
        res.json({ status: true, message: "login route", data: user })
    }
    checkUser = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('true');
            }, 4000);
        });
    }
    routes = () => {
        this.router.get('/', this.index);
        this.router.post('/login', indexController.loginUser);
        this.router.post('/profile', verifyAuth, this.index);
        this.router.use(verifyAuth);
        this.router.use('/users', UsersRouter);
        return this.router;
    }
}
export default new IndexRouter().routes();