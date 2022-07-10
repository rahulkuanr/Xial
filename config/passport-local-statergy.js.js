const passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStratergy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      //find a user and establish the identity
      User.findOne({ email: email }, (error, user) => {
        if (error) {
          console.log("Error in finding user ---> Passport");
          return done(error);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializing the user from the key in the cookie
passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    if (error) {
      console.log("Error in finding user ---> Passport");
      return done(error);
    }

    return done(null, user);
  });
});

//check if user is uthenticated
passport.checkAuthentication = (request, response, next) => {
    //if user is signed in then pass on the request to the controller function
    if(request.isAuthenticated()) {
        return next();
    }

    // if user is not signed in
    return response.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (request, resposne, next) => {
    if(request.isAuthenticated()) {
        //request.user contains the signed in users info from the session cookies and we are just passing it to the views via locals
        resposne.locals.user = request.user;
    }

    next();
}

module.exports = passport;
