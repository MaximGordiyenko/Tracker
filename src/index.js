const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const envConfig = dotenv.config();
if (envConfig.error) {
    console.log('.env file does not loaded');
    throw envConfig.error;
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('src/view/public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname.concat('/view/public')});
});

app.post('/login', (req, res) => {
    console.log('login REQ', req.body);
    return res.send(200)
});

app.post('/signup', (req, res) => {
    console.log('signup REQ', req.body);
    return res.send(200)
});

mongoose.connect(process.env.MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((result) => {
    console.log(`MongoDB connection granted`);
}).catch(error => console.log(`There is troubles with connecting to MongoDB ${error}`));

app.listen(process.env.NODE_PORT, () => console.log(`tracker running on port: ${process.env.NODE_PORT}`));
