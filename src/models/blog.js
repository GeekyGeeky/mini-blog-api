import { Schema, model } from "mongoose";
import sanitizeHtml from 'sanitize-html';
import { slugify } from '../utils/helpers';

const BlogpostSchema = new Schema({
    title: String,
    slug: String,
    content: { type: String, required: true },
    imgUrl: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tags: String,
    createdAt: { type: Date, default: Date.now }
});

BlogpostSchema.pre('save', async function () {
    this.slug = slugify(this.title);
    this.content = sanitizeHtml(this.content);
});


export default model('Blogpost', BlogpostSchema);