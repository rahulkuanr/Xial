const { response } = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = (request, response) => {
    Post.create({
        content: request.body.content,
        user: request.user._id
    }, (error, post) => {
        if(error) {
            console.log('Error in creating a post');
            return;
        }

        return response.redirect('back');
    });
};

module.exports.destroy = (request, response) => {
    Post.findById(request.params.id, (error, post) => {
        //.id is converting the object _id into string which is done bu mongoose
        if(post.user == request.user.id) {
            post.remove();

            Comment.deleteMany({post: request.params.id}, (error) => {
                return response.redirect('back');
            });
        } else {
            return response.redirect('back');
        }
    });
};