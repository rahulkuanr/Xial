const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = (request, response) => {

    //populate the user for each post and send it to the view
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        options: { sort: { 'createdAt': -1 } },
        populate: {
            path: 'user'
        }
    })
    .sort('-updatedAt')
    .exec((error, posts) => {

        //passing the userslist to view
        User.find({}, (error, users) => {
            return response.render('home', {
                title: "Xial | Home",
                posts: posts,
                all_users: users
            });
        });
    });
};