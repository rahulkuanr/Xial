const { response } = require('express');
const Post = require('../models/post')

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