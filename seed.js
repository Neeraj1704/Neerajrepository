const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/loginDB')
  .then(() => {
    console.log("MongoDB connected");

    return User.insertMany([
      { username: 'admin1', password: 'pass1', role: 'admin' },
      { username: 'admin2', password: 'pass2', role: 'admin' },
      { username: 'user1', password: 'pass3', role: 'user' },
      { username: 'user2', password: 'pass4', role: 'user' },
      { username: 'user3', password: 'pass5', role: 'user' },
      { username: 'user4', password: 'pass6', role: 'user' },
      { username: 'user5', password: 'pass7', role: 'user' },
      { username: 'user6', password: 'pass8', role: 'user' },
      { username: 'user7', password: 'pass9', role: 'user' },
      { username: 'user8', password: 'pass10', role: 'user' },
      { username: 'user9', password: 'pass11', role: 'user' },
      { username: 'user10', password: 'pass12', role: 'user' },
      { username: 'user11', password: 'pass13', role: 'user' },
      { username: 'user12', password: 'pass14', role: 'user' },
      { username: 'user13', password: 'pass15', role: 'user' }
    ]);
  })
  .then(() => {
    console.log("15 users inserted successfully");
    mongoose.disconnect();
  })
  .catch(err => console.error("Error:", err));



