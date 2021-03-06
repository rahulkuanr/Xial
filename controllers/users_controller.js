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

//update user profile
module.exports.update = (request, response) => {
  if(request.user.id == request.params.id) {
    User.findByIdAndUpdate(request.params.id, request.body, (error, user) => {
      request.flash('success', 'Profile updated succesfully');
      return response.redirect('back');
    });
  } else {
    return response.status(401).send('Unauthorized');
  }
}

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
    request.flash('error', 'Password didn\'t match');
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
          request.flash('error', error);
          return;
        }
        request.flash('success', 'Account created succesfully');
        return response.redirect('/users/sign-in');
      });
    } else {
        request.flash('error', 'User already exists');
        return response.redirect("back");
    }
  });
};

//sign in and create session for the user
module.exports.createSession = (request, response) => {
  request.flash('success', 'Logged In');
  return response.redirect('/');
};


//sign out and destroy session for user
module.exports.destroySession = (request, response) => {
  request.logout(
    (error) => {
      if(error) {
        console.log('Error logging out');
      }
    }
  );
  request.flash('success', 'Logged Out');

  return response.redirect('/');
};