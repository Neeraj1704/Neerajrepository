const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Fault = require('./models/Fault');

const app = express();
mongoose.connect('mongodb://localhost:27017/loginDB');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/loginDB' })
}));

// Login Page
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user) return res.send('Invalid credentials');

  req.session.user = user;
  res.redirect('/home');
});

// After Login - Choose Admin/User
app.get('/home', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('home', { user: req.session.user });
});

// Admin Dashboard
app.get('/admin/dashboard', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') return res.redirect('/');
  const faults = await Fault.find();
  res.render('adminDashboard', { faults });
});

// User Fault Form
app.get('/user/fault', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'user') return res.redirect('/');
  res.render('faultForm');
});

app.post('/user/fault', async (req, res) => {
  const fault = new Fault(req.body);
  await fault.save();
  res.send('Fault submitted successfully. <a href="/user/fault">Submit another</a>');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));






