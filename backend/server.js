const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_PATH;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('frontend/public'));


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((result) => {
    console.log("MongoDB database connection established successfully:");
    console.log(result.connections[0].host);
    console.log(result.connections[0].user);
    console.log(result.connections[0].pass);
    console.log(result.models.User);
    console.log(result.models.Todo);
}).catch(error => console.log(error));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});