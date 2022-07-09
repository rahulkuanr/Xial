const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const app = express();

app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));

//using express router to route
app.use('/', require('./routes'));

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (error) => {
    if(error){
        console.log(`Error in running the server: ${error}`);
    }

    console.log(`Server is running on port: ${port}`);
});