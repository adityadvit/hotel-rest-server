const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan());

let apiRoutes = require("./controllers/apiRoutes");
//apiRoutes will handle version 1 apis
app.use("/api/v1", apiRoutes);

//Default route handling
app.get('/', function(req, res){
    res.send("Hello World");
});

app.listen(3005, function(){
    console.log("Server listening on 3005");
})
