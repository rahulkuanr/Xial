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

// get sign up data
module.exports.create = (request, response) => {
    //todo later
};

//sign in and create session for the user
module.exports.createSession = (request, response)=> {
    //todo later
};