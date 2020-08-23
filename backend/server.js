const express = require('express'); //assigning express module to express variable.
const cors = require('cors'); //assingning cors module to cors variable.
const mongoose = require('mongoose');

require('dotenv').config(); //Create a .env file in the root directory of project. 

const app = express(); //creating express object to set up server.
const port = process.env.PORT || 8080;

app.use(cors()); //making app to use cross platform rounting. 
app.use(express.json()); //it  uses body-parser() of node to parse body of message to json object.


const uri = process.env.ATLAS_URI; //if databse's name has space then avoid space in name while its name in uri.

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connection to MongoDB is successful");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});