import { Router } from 'express';
import BlogpostController from '../controllers/blogpost';
import verifyAuth from '../middlewares/auth_handler';
import Validator from '../utils/validator';

class BlogpostRouter {
    constructor() {
        this.router = Router();
    }
    routes = () => {
        this.router.get('/', BlogpostController.getAllPosts);
        this.router.post('/create', verifyAuth, Validator.createPostValidator, BlogpostController.createPost);
        return this.router;
    }
}
export default new BlogpostRouter().routes();