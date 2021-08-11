import { Router } from 'express';
import UserController from '../controllers/user';

class UsersRouter {
    constructor() {
        this.router = Router();
    }
    index = (req, res) => {
        res.json({ status: true, message: "Users Base Endpoint" })
    }
    routes = () => {
        this.router.get('/', this.index);
        this.router.get('/profile/:username', UserController.getUserProfile);
        return this.router;
    }
}
export default new UsersRouter().routes();