const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (request, response) => {
    try {
        let post = await Post.findById(request.body.post);

        if(post) {
            let comment = await Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            });

            //if comment get created add comment to post
            post.comments.push(comment);
            post.save();
            request.flash('success', 'Comment added!');
            response.redirect('/');
        }
    } catch(error) {
        request.flash('error', error);
        return;
    }
};

module.exports.destroy = async (request, response) => {
    let comment = await Comment.findById(request.params.id);

    if(comment.user == request.user.id) {
        let postId = comment.post;

        comment.remove();

         await Post.findByIdAndUpdate(postId, {$pull: {comments: request.params.id}});
         request.flash('success', 'Comment deleted');
    }
    return response.redirect('back');
}