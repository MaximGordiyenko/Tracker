const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('./src/view/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname.concat('/view/public')});
});

app.post('/login', (req, res) => {
    console.log('login REQ', req.body)
    return res.send(200)
});

app.post('/signup', (req, res) => {
    console.log('signup REQ', req.body)
    return res.send(200)
});

app.listen(process.env.NODE_PORT, () => console.log(`tracker running on port: ${process.env.NODE_PORT}`));
