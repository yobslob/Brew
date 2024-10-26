import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isFollowed: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
        default: ["Technology"]
    },
    about: {
        type: String,
    }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
