const Post = require('../models/post')

module.exports.home = (request, response) => {

    // Post.find({}, (error, posts) => {
    //     return response.render('home', {
    //         title: "Xial | Home",
    //         posts: posts
    //     });
    // })

    //populate the user for each post and send it to the view
    Post.find({}).populate('user').exec((error, posts) => {
        return response.render('home', {
            title: "Xial | Home",
            posts: posts
        });
    });
};