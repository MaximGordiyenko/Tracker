const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('frontend/public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

app.listen(4000, () => console.log('May node be with you on port 4000'));