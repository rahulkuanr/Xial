const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(expressLayouts);

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