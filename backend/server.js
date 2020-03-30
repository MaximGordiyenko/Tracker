const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.NODE_PORT;
const DB = process.env.MONGO_PATH;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('frontend/public'));


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    console.log("MongoDB database connection established successfully:");
    console.log(result.connections[0].host);
    console.log(result.connections[0].name);
    console.log(result.connections[0].name);
    console.log(result.connections[0].user);
    console.log(result.connections[0].pass);
    console.log(result.models.User);
    console.log(result.models.Todo);
});

app.listen(PORT, () => {
    console.debug("Server is running on Port: " + PORT);
});