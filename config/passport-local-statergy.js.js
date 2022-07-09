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

module.exports = passport;
