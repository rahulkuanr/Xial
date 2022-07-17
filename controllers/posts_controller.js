const { response } = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (request, response) => {
    try {
        await Post.create({
            content: request.body.content,
            user: request.user._id
        });
        request.flash('success', 'Post Published!');
        return response.redirect('back');
    } catch(error) {
        request.flash('error', error);
        return response.redirect('back');
    }
};

module.exports.destroy = async (request, response) => {
    try {
        let post = await Post.findById(request.params.id);

        if(post.user == request.user.id) {
            post.remove();

            await Comment.deleteMany({post: request.params.id});
        }
        request.flash('success', 'Post Deleted!');
        return response.redirect('back');
    } catch(error) {
        request.flash('error', error);
        return response.redirect('back');


    }
    
};