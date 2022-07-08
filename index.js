const express = require('express');
const port = 8000;

const app = express();

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