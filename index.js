const express = require('express')

const studentroutes = require('./routes/api');

const app = express();

app.use(studentroutes);

app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on: http://localhost:4000');

});