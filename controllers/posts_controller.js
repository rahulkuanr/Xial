const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async (request, response) => {
    try {
        let post = await Post.create({
            content: request.body.content,
            user: request.user._id
        });

        if(request.xhr){
            return response.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }

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

        if(request.xhr){
            return response.status(200).json({
                data: {
                    post_id: request.params.id
                },
                message: 'Post Deleted'
            });
        }

        request.flash('success', 'Post Deleted!');
        return response.redirect('back');
    } catch(error) {
        request.flash('error', error);
        return response.redirect('back');


    }
    
};