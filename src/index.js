const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
import dotenv from 'dotenv'; // now imports are allowed TODO: update all other imports
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
import User from '../models/users';


const envConfig = dotenv.config();
if (envConfig.error) {
    console.log('.env file does not loaded');
    throw envConfig.error;
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then((result) => {
    console.log(`MongoDB connection granted`);
}).catch(error => console.log(`There is troubles with connecting to MongoDB ${error}`));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('success connect')
});

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('src/view/public'));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname.concat('/view/public')});
});

app.post('/login', (req, res,next) => {
    const {username, pass} = req.body;
    User.authenticate(username, pass, function (error, user) {
        if (error || !user) {
            const err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.userId = user._id;
            return res.redirect('/profile');
        }
    });
});

app.post('/signup', (req, res, next) => {

    console.log('signup REQ', req.body);
    const {username, email, pass, repass, role} = req.body;
    if (!role) {
        return res.status(400).send("role is not specified");
    }
    if (pass !== repass) {
        return res.status(400).send("passwords dont match");
    }

    if(username && email && pass && repass && role) {
        const userData = {
            email,
            username,
            role,
            password: pass,
        };

        User.create(userData, function (error, user) {
            if (error) {
                return res.status(400).send("mongoDB cannot create such user")
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile'); // TODO: should be implemented
            }
        });

    }

});

app.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

app.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
      .exec(function (error, user) {
          if (error) {
              return next(error);
          } else {
              if (user === null) {
                  const err = new Error('Not authorized! Go back!');
                  err.status = 400;
                  return next(err);
              } else {
                  const {username, email} = user;
                  return res.send(`
                  <b>username:</b>${username}<br>
                  <b>email:</b>${email}<br> 
                  <a type="button" href="/logout">Logout</a>
                  `)
              }
          }
      });
});


app.listen(process.env.NODE_PORT, () => console.log(`tracker running on port: ${process.env.NODE_PORT}`));
