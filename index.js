const express = require('express');
require('dotenv').config();
require('./helpers/init_mongodb');
const studentroutes = require('./routes/api');      
const userroutes = require('./routes/userroute'); 

const app = express();
app.use(express.json());
app.use(studentroutes);
app.use(userroutes);

// 404 handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

app.listen(process.env.PORT || 4000, function () {
    console.log('Now listening for requests on: http://localhost:4000');
});
