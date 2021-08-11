import { check, body } from 'express-validator';

export default class Validator {
    static loginValidator = [
        check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
        check('email').isEmail().withMessage('Enter a valid email'),
        body('email').toLowerCase(),
    ]
    static signupValidator = [
        check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
        check('username').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
        check('name').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
        check('email').isEmail().withMessage('Enter a valid email'),
        body('email').toLowerCase(),
        body('username').toLowerCase(),
    ]
    static createPostValidator = [
        check('title').isLength({ min: 4 }).withMessage('must be at least 4 chars long'),
    ]
}