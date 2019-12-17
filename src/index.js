const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan());

const dbConfig = require('./config/database.config.js');
let apiRoutes = require("./controllers/apiRoutes");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(function() {
    console.log("database connected successfully");
}).catch(function() {
    console.log("database connection failed exiting");
    process.exit();
});

//apiRoutes will handle version 1 apis
app.use("/api/v1", apiRoutes);

//Default route handling
app.get('/', function(req, res){
    res.send("Hello World");
});

app.listen(3005, function(){
    console.log("Server listening on 3005");
});
