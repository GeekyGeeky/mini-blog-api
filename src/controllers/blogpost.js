import { asyncHandler } from '../middlewares/async_handler';
import ErrorResponse from '../utils/error_response';
import { JsonResponse } from '../utils/helpers';

//import models
import BlogpostModel from '../models/blog';

export default class BlogpostController {

    static getAllPosts = asyncHandler(
        async (req, res, next) => {

            const blogPosts = await BlogpostModel.find().populate({ path: 'author', select: 'name username'});

            return new JsonResponse(200).success(res, "Available blog posts", blogPosts);

        });

    static createPost = asyncHandler(
        async (req, res, next) => {
            const { id } = req.user;
            const { title, content, imgUrl, tags }  = req.body;

            const blogPost = await BlogpostModel.create({ title, content, imgUrl, tags, author: id });

            return new JsonResponse(201).success(res, "Blog post added", blogPost);

        });
}


/**
 * 
 * 
 *  const transactionHistory = await Transaction.findOne({
                $or: [
                    { $and: [{ creatorId: uid }, { _id: transaction_id }] },
                    { $and: [{ recipientId: uid }, { _id: transaction_id }] }
                ]
            }, { __v: 0 }).populate({ path: 'creatorId', select: 'username email' }).populate({ path: 'recipientId', select: 'email username' });
 */