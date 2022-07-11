const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (request, response) => {
    Post.findById(request.body.post, (error, post) => {

        if(post) {
            Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            }, (error, comment) => {
                //handle error skipped

                //if comment get created add comment to post
                post.comments.push(comment);
                post.save();

                response.redirect('/');
            })
        }

    });
};