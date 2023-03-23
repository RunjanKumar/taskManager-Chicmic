require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 8001;

const dataRouter = require('./router/dataRoute.js');
const userRouter = require('./router/userRoute.js');


const app = express();



/* Connect to the database */
mongoose.connect('mongodb://localhost:27017/userDB')
.then( () => console.log("Successfully Connected to DB ......") )
.catch((err) => console.log(err.message));

/* MiddleWares */
app.use(express.json());
app.use(cors());
app.use('/user'  , userRouter );
app.use('/data'  , dataRouter);

/* Start the server */
app.listen(port , () => console.log(`server is listening on ${port}`));
