import { Router } from 'express';
import indexController from '../controllers';

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
        this.router.get('/login', indexController.loginUser);
        return this.router;
    }
}
export default new IndexRouter().routes();