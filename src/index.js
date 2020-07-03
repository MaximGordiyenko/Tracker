const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const ProfileController = require('./controllers/profile');
const LogoutController = require('./controllers/logout');
const SignupController = require('./controllers/signup');
const LoginController = require('./controllers/login');
const TrucksController = require('./controllers/trucks');
const LoadsController = require('./controllers/loads');
// const {isDriver, isAdmin, isCustomer} = require('./middlewares/roles');
const User = require('./models/users');

const app = express();
const MongoStore = connectMongo(session);

const envConfig = dotenv.config();
if (envConfig.error) {
  console.log('.env file does not loaded');
  throw envConfig.error;
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log(`MongoDB connection granted`);
}).catch(error => console.log(`There is troubles with connecting to MongoDB ${error}`));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('success connect');
});

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));

const roleLoggerMiddleWare = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    console.log('current user role:', user.role || 'unauthorized');
  } catch (err) {
    console.log('current user role:', 'unauthorized');

  }
  next();
};
//static content
app.use(express.static('src/view/public'));
app.use('/trucks', roleLoggerMiddleWare, express.static('src/view/trucks'));
app.use('/loads', roleLoggerMiddleWare, express.static('src/view/loads'));

app.post('/login', roleLoggerMiddleWare, LoginController);
app.post('/signup', roleLoggerMiddleWare, SignupController);
app.get('/logout', roleLoggerMiddleWare, LogoutController);
app.get('/profile', roleLoggerMiddleWare, ProfileController);
app.use('/truck', roleLoggerMiddleWare, TrucksController);
app.use('/load', roleLoggerMiddleWare, LoadsController);

app.listen(process.env.NODE_PORT, () => console.log(`tracker running on port: ${process.env.NODE_PORT}`));
