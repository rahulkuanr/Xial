// render user profile
module.exports.profile = (request, response) => {
    return response.render('user_profile', {
        title: "User Profile"
    });
};

// render the signup page
module.exports.signUp = (request, response) => {
    return response.render('user_sign_up', {
        title: 'Xial | Sign Up'
    });
};

// render the sign in page
module.exports.signIn = (request, response) => {
    return response.render('user_sign_in', {
        title: 'Xial | Sign In'
    });
};