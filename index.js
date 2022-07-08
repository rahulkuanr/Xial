const express = require('express');
const port = 8000;

const app = express();

//using express router to route
app.use('/', require('./routes'));

app.listen(port, (error) => {
    if(error){
        console.log(`Error in running the server: ${error}`);
    }

    console.log(`Server is running on port: ${port}`);
});