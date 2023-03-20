const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 8001;
const app = express();
const router = require('./router/route.js');
const { userValidation }= require('./validation/userValidate.js');
/* Connect to the database */
mongoose.connect('mongodb://localhost:27017/userDB')
.then( () => console.log("Successfully Connected to DB ......") )
.catch((err) => console.log(err.message));

/* MiddleWares */
app.use(express.json());
app.use('/' , userValidation , router);

app.listen(port , () => console.log(`server is listening on ${port}`));
