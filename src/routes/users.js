import { Router } from 'express';
import indexController from '../controllers';
import verifyAuth from '../middlewares/auth_handler';

class UsersRouter {
    constructor() {
        this.router = Router();
    }
    index = (req, res) => {
        res.json({ status: true, message: "Users base router" })
    }
    // loginUser = async (req, res) => {
    //     const user = await this.checkUser();
    //     res.json({ status: true, message: "login route", data: user })
    // }
    // checkUser = async () => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(function () {
    //             resolve('true');
    //         }, 4000);
    //     });
    // }
    routes = () => {
        this.router.get('/', this.index);
        // this.router.post('/login', indexController.loginUser);
        // this.router.post('/profile', verifyAuth, this.index);
        return this.router;
    }
}
export default new UsersRouter().routes();