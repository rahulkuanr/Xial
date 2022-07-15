const User = require("../models/user");

// render user profile
module.exports.profile = (request, response) => {
  User.findById(request.params.id, (error, user) => {
    return response.render("user_profile", {
      title: "User Profile",
      profile_user: user
    });
  });
};

// render the signup page
module.exports.signUp = (request, response) => {
  //redirect to profile page if user is already signed in and tries to signup again
  if(request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }

  return response.render("user_sign_up", {
    title: "Xial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = (request, response) => {
  //redirect to profile page if user is already signed in and tries to signin again
  if(request.isAuthenticated()) {
    return response.redirect("/users/profile");
  }

  return response.render("user_sign_in", {
    title: "Xial | Sign In",
  });
};

// get sign up data
module.exports.create = (request, response) => {
  if (request.body.password != request.body.confirmPassword) {
    return response.redirect("back");
  }

  User.findOne({ email: request.body.email }, (error, user) => {
    if (error) {
      console.log("Error in finding user while sign up");
      return;
    }

    if (!user) {
      User.create(request.body, (error, user) => {
        if (error) {
          console.log("Error in creating user");
          return;
        }

        return response.redirect('/users/sign-in');
      });
    } else {
        return response.redirect("back");
    }
  });
};

//sign in and create session for the user
module.exports.createSession = (request, response) => {
  return response.redirect('/');
};


//sign out and destroy session for user
module.exports.destroySession = (request, response) => {
  request.logout(
    (error) => {
      if(error) {
        console.log('Error logging out');
        return;
      }
    }
  );
  return response.redirect('/');
};