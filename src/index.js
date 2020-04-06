import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import {ProfileController} from './controllers/profile';
import {LogoutController} from './controllers/logout';
import {SignupController} from './controllers/signup';
import {LoginController} from './controllers/login';
import {TrucksController} from './controllers/trucks';
import {LoadsController} from './controllers/loads';

const app = express();
const MongoStore = connectMongo(session);

const envConfig = dotenv.config();
if (envConfig.error) {
  console.log('.env file does not loaded');
  throw envConfig.error;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

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
  console.log('success connect');
});

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(express.static('src/view/public'));
// app.use('/trucks', express.static('src/view/trucks'));

app.post('/login', LoginController);
app.post('/signup', SignupController);
app.get('/logout', LogoutController);
app.get('/profile', ProfileController);
app.use('/truck', TrucksController);
app.use('/loads', LoadsController);

app.listen(process.env.NODE_PORT, () => console.log(`tracker running on port: ${process.env.NODE_PORT}`));
