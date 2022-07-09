const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-statergy.js');

const app = express();

app.use(expressLayouts);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'xial',
    //todo change the secret before deployment to production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//using express router to route
app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log(`Error in running the server: ${error}`);
    }

    console.log(`Server is running on port: ${port}`);
});