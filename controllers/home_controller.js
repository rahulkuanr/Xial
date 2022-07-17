const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (request, response) => {

    //populate the user for each post and send it to the view
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            options: { sort: { 'createdAt': -1 } },
            populate: {
                path: 'user'
            }
        })
        .sort('-updatedAt');

        //passing the userslist to view
        let users = await User.find({});

        return response.render('home', {
            title: "Xial | Home",
            posts: posts,
            all_users: users
        });
    } catch(error) {
        console.log('Error: ', error);
    }
};