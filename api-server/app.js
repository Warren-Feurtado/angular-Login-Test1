require('dotenv/config');
require('./lib/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//Routers
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');

//Express app middleware setup
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.use('/users', userRouter);
app.use('/login', authRouter);

const port = process.env.PORT || 6060;
app.listen(port, () => console.log(`Server Listening on port: ${port}...`));


