const User = require("../models/user");

// render user profile
module.exports.profile = (request, response) => {
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id, (error, user) => {
            if(user) {
                return response.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            } else {
                return response.redirect('/users/sign-in');
            }
        });
    } else {
        return response.redirect('/users/sign-in');
    }
};

// render the signup page
module.exports.signUp = (request, response) => {
  return response.render("user_sign_up", {
    title: "Xial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = (request, response) => {
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
  //find user
  User.findOne({ email: request.body.email }, (error, user) => {
    if (error) {
      console.log("Error in finding user while sign in");
      return;
    }

    // handle if user found
    if (user) {
      // handle password not matching
      if (user.password != request.body.password) {
        return response.redirect("back");
      }

      // handle session creation
      response.cookie("user_id", user.id);
      return response.redirect("/users/profile");

    } else {
      //handle if user not found
      return response.redirect("back");
    }
  });
};
